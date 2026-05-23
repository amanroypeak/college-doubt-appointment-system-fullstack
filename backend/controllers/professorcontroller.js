import professorModel from "../models/professermodel.js"
import appointmentModel from "../models/appointmentmodel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'



// API TO CHANGE AVAILABILITY

const changeAvailability = async (req,res) => {

    try {

        const {ProfId} = req.body

        const profData = await professorModel.findById(ProfId)

        await professorModel.findByIdAndUpdate(
            ProfId,
            {
                available: !profData.available
            }
        )

        res.json({
            success:true,
            message:'Availability Changed'
        })

    } catch (error) {

        console.log(error)

        res.json({
            success:false,
            message:error.message
        })

    }

}



// API TO GET PROFESSOR LIST

const professorList = async(req,res)=>{

    try {

        const professors = await professorModel
        .find({})
        .select('-password -email')

        res.json({
            success:true,
            professors
        })

    } catch (error) {

        console.log(error)

        res.json({
            success:false,
            message:error.message
        })

    }

}



// API FOR PROFESSOR LOGIN

const loginProfessor = async (req,res) => {

    try {

        const {email,password} = req.body

        const professor = await professorModel.findOne({email})

        if(!professor){

            return res.json({
                success:false,
                message:'Invalid Credentials'
            })

        }

        const isMatch = await bcrypt.compare(
            password,
            professor.password
        )

        if(isMatch){

            const token = jwt.sign(
                {id: professor._id},
                process.env.JWT_SECRET
            )

            res.json({
                success:true,
                token
            })

        }

        else{

            return res.json({
                success:false,
                message:'Invalid Credentials'
            })

        }

    } catch (error) {

        console.log(error)

        res.json({
            success:false,
            message:error.message
        })

    }

}



// API TO GET PROFESSOR APPOINTMENTS

const appointmentProfessor = async (req,res) => {

    try {

        const ProfId = req.ProfId

        const appointments = await appointmentModel.find({ProfId})

        res.json({
            success:true,
            appointments
        })

    } catch (error) {

        console.log(error)

        res.json({
            success:false,
            message:error.message
        })

    }

}



// API TO COMPLETE APPOINTMENT


const completeAppointment = async (req, res) => {

    try {

        const { appointmentId } = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)

        await appointmentModel.findByIdAndUpdate(
            appointmentId,
            { isCompleted: true }
        )

        const { ProfId, slotDate, slotTime } = appointmentData

        const professorData = await professorModel.findById(ProfId)

        let slots_booked = professorData.slots_booked

        slots_booked[slotDate] = slots_booked[slotDate].filter(
            e => e !== slotTime
        )

        await professorModel.findByIdAndUpdate(
            ProfId,
            { $set: { [`slots_booked.${slotDate}`]: slots_booked[slotDate] } }
        )

        res.json({
            success: true,
            message: 'Appointment Completed'
        })

    } catch (error) {

        console.log(error)
        res.json({ success: false, message: error.message })

    }
}


// API TO CANCEL APPOINTMENT

const cancelAppointmentProfessor = async (req,res) => {

    try {

        const {appointmentId} = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)

        await appointmentModel.findByIdAndUpdate(
            appointmentId,
            {
                cancelled:true
            }
        )



        // FREE SLOT AGAIN

        const {
            ProfId,
            slotDate,
            slotTime
        } = appointmentData



        const professorData = await professorModel.findById(ProfId)

        let slots_booked = professorData.slots_booked



        slots_booked[slotDate] =
            slots_booked[slotDate].filter(
                e => e !== slotTime
            )



        await professorModel.findByIdAndUpdate(
            ProfId,
            {
                slots_booked
            }
        )



        res.json({
            success:true,
            message:'Appointment Cancelled'
        })

    } catch (error) {

        console.log(error)

        res.json({
            success:false,
            message:error.message
        })

    }

}





// API TO GET PROFESSOR PROFILE

const professorProfile = async (req,res) => {

    try {

        const ProfId = req.ProfId

        const profileData = await professorModel
        .findById(ProfId)
        .select('-password')

        res.json({
            success:true,
            profileData
        })

    } catch (error) {

        console.log(error)

        res.json({
            success:false,
            message:error.message
        })

    }

}



// API TO UPDATE PROFESSOR AVAILABILITY

const updateProfessorAvailability = async (req,res) => {

    try {

        const {available} = req.body

        const ProfId = req.ProfId

        await professorModel.findByIdAndUpdate(
            ProfId,
            {available}
        )

        res.json({
            success:true,
            message:'Availability Updated'
        })

    } catch (error) {

        console.log(error)

        res.json({
            success:false,
            message:error.message
        })

    }

}





// API TO GET PROFESSOR DASHBOARD DATA

const professorDashboard = async (req,res) => {

    try {

        const ProfId = req.ProfId

        // all appointments of logged in professor

        const appointments = await appointmentModel.find({ProfId})

        // unique students count

        let students = []

        appointments.map((item) => {

            if(!students.includes(item.userId)){
                students.push(item.userId)
            }

        })

        const dashData = {

            appointments : appointments.length,

            students : students.length

        }

        res.json({
            success:true,
            dashData
        })

    } catch (error) {

        console.log(error)

        res.json({
            success:false,
            message:error.message
        })

    }

}



export {

    changeAvailability,
    professorList,
    loginProfessor,
    appointmentProfessor,
    completeAppointment,
    cancelAppointmentProfessor,
    professorProfile,
updateProfessorAvailability,
professorDashboard

}