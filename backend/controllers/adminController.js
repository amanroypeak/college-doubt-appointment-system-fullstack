import validator from 'validator'
import bcrypt from 'bcrypt'
import {v2 as cloudinary} from "cloudinary"
import professorModel from '../models/professermodel.js'
import jwt from 'jsonwebtoken'
import appointmentModel from '../models/appointmentmodel.js'
import userModel from '../models/usermodel.js'
//API for adding professor

const addProfessor = async(req, res) =>{
    try {
        const {name,email,speciality,password} = req.body
        const imageFile = req.file

        //checking for all data to add professor

        if(!name || !email || !password || !speciality){
            return res.json({success:false,message:"Missing details"})
        }

        //validating email format 

        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter a valid email"})

        }
        //validating strong password

        if(password.length<8){
            return res.json({success:false,message:"Please enter a strong password"})

        }

        //hashing professor password

        const salt = await bcrypt.genSalt(10)
        const hashedpassword = await bcrypt.hash(password,salt)

        //upload image to cloudinary
        
        
        

        const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})
        const imageUrl = imageUpload.secure_url

        const professorData = {
            name,
            email,
            image:imageUrl,
            password:hashedpassword,
            speciality,
            date:Date.now(),
             available:true,
        }

        const newProfessor = new professorModel(professorData)
        await newProfessor.save()

        res.json({success:true,message:"Professor added"})

       
        



    } catch (error) {

        console.log(error)
        res.json({success:false, message:error.message})
        
    }
}
//API for admin login

const loginAdmin = async (req,res) => {
    try {
        const {email,password} = req.body

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){

            const token = jwt.sign(email+password,process.env.JWT_SECRET)
            res.json({success:true,token})



        }else{
            res.json({success:false, message:"Invalid Credentials"})
        }
        
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
        
    }


}

//API to get all professor list 

const allProfessors = async (req,res) => {

    try {
        const professors = await professorModel.find({}).select('-password')
        res.json({success:true,professors})
        
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
        
        
    }
    
}

//API to get all appointments list

const appointmentsAdmin = async (req,res) => {

    try {

        const appointments = await appointmentModel.find({})
        res.json({success:true,appointments})
        
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
        
    }
    
}

//API to cancel appointment

// API to cancel appointment by admin

const cancelAppointmentAdmin = async (req, res) => {

    try {

        const { appointmentId } = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)

        await appointmentModel.findByIdAndUpdate(
            appointmentId,
            { cancelled: true }
        )

        // remove booked slot from professor

        const { ProfId, slotDate, slotTime } = appointmentData

        const professorData = await professorModel.findById(ProfId)

        let slots_booked = professorData.slots_booked

        slots_booked[slotDate] = slots_booked[slotDate].filter(
            (e) => e !== slotTime
        )

        await professorModel.findByIdAndUpdate(
            ProfId,
            { slots_booked }
        )

        res.json({
            success: true,
            message: "Appointment Cancelled"
        })

    } catch (error) {

        console.log(error)

        res.json({
            success: false,
            message: error.message
        })

    }

}

// API for admin dashboard data

const adminDashboard = async (req, res) => {

    try {

        const professors = await professorModel.find({})
        const users = await userModel.find({})
        const appointments = await appointmentModel.find({})

        const dashData = {

            professors: professors.length,
            appointments: appointments.length,
            students: users.length,

            latestAppointments: appointments.reverse().slice(0, 5)

        }

        res.json({
            success: true,
            dashData
        })

    } catch (error) {

        console.log(error)

        res.json({
            success: false,
            message: error.message
        })

    }

}

export {addProfessor,loginAdmin,allProfessors,appointmentsAdmin, cancelAppointmentAdmin,adminDashboard}