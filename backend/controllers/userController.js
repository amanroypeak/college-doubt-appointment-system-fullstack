import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/usermodel.js'
import jwt from 'jsonwebtoken'
import {v2 as cloudinary} from 'cloudinary'
import professorModel from '../models/professermodel.js'
import appointmentModel from '../models/appointmentmodel.js'

//API to register user

const registerUser = async (req,res)=>{
    try {

        const{name,email,password} = req.body
        const exisitingUser = await userModel.findOne({email})


        if(!name || !password || !email){
            return res.json({success:false,message:"Missing Details"})

        }

        if(exisitingUser){
            return res.json({success:false, message:"user already exists"})
        }
        

        if(!validator.isEmail(email)){
             return res.json({success:false,message:"Enter a Valid Email"})

        }

        if (password.length <8){
             return res.json({success:false,message:"Enter a strong passsword"})

        }
        //hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedpassword = await bcrypt.hash(password,salt)

        const userData = {
            name,
            email,
            password:hashedpassword
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()
        
        const token = jwt.sign ({id:user._id}, process.env.JWT_SECRET)
        res.json({success:true, token})

        
        
    } catch (error) {
         console.log(error)
        res.json({success:false, message:error.message})

        
    }
}
//API for user login

const loginUser = async( req,res) =>{
    try {
        const{email,password} = req.body
        const user = await userModel.findOne({email})
        if(!user){
            return res.json({success:false,message:'User does not exist'})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(isMatch){
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
            res.json({success:true,token})
        }else{
            res.json({success:false, message:"Invalid credentials"})
        }
    } catch (error) {
          console.log(error)
        res.json({success:false, message:error.message})
        
    }
}
//API to get user profile data
const getProfile = async (req,res) => {
    try {

        const userId = req.userId

        const userData = await userModel
        .findById(userId)
        .select('-password')

        res.json({success:true,userData})

    } catch (error) {

        console.log(error)
        res.json({success:false, message:error.message})

    }
}
//API to update user profile

const updateProfile = async (req,res) => {

    try {
       const {name,phone,address,dob,gender} = req.body
       const userId = req.userId

        const imageFile = req.file
        if (!name ||!phone || !address) {

            return res.json({success:false,message:"Data Missing"})
        }
        await userModel.findByIdAndUpdate(userId,{name,phone,address:JSON.parse(address)})

        if(imageFile){
            //upload image to cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
            const imageURL = imageUpload.secure_url

            await userModel.findByIdAndUpdate(userId,{image:imageURL})
            
        }
        res.json ({success:true,message:"Profile Updated"})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
    
}

//API to book appointment 

const bookAppointment = async (req, res) => {
  try {
    const userId = req.userId   
    const { ProfId, slotDate, slotTime } = req.body

    const profData = await professorModel.findById(ProfId).select('-password')

    if (!profData.available) {
      return res.json({ success: false, message: 'Professor is not available' })
    }

    let slots_booked = profData.slots_booked || {}

    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: 'Slot is not available' })
      } else {
        slots_booked[slotDate].push(slotTime)
      }
    } else {
      slots_booked[slotDate] = []
      slots_booked[slotDate].push(slotTime)
    }

    const userData = await userModel.findById(userId).select('-password')

    if (!userData) {
    return res.json({ 
        success: false,                                                  
        message: 'Session expired. Please login again.' 
    })
}


    const appointmentData = {
      userId,
      ProfId,
      userData,
      profData,
      slotTime,
      slotDate,
      date: Date.now()
    }

    const newAppointment = new appointmentModel(appointmentData)
    await newAppointment.save()

    await professorModel.findByIdAndUpdate(ProfId, { slots_booked })

    res.json({ success: true, message: 'Appointment Booked' })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}


const listAppointment = async (req, res) => {

    try {

        const userId = req.userId

        const appointments = await appointmentModel.find({ userId })

        res.json({
            success: true,
            appointments
        })

    } catch (error) {

        console.log(error)

        res.json({
            success: false,
            message: error.message
        })
    }
}

//API to cancel Appointments

// API to cancel appointment

const cancelAppointment = async (req, res) => {

    try {

        const { appointmentId } = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)

        if (!appointmentData) {
            return res.json({
                success: false,
                message: "Appointment not found"
            })
        }

        await appointmentModel.findByIdAndUpdate(
            appointmentId,
            { cancelled: true }
        )

        const { ProfId, slotDate, slotTime } = appointmentData

        const profData = await professorModel.findById(ProfId)

        let slots_booked = profData.slots_booked

        // remove cancelled slot

        if (slots_booked[slotDate]) {

            slots_booked[slotDate] =
                slots_booked[slotDate].filter(
                    (e) => e !== slotTime
                )
        }

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
export {registerUser,loginUser,getProfile,updateProfile, bookAppointment, listAppointment,cancelAppointment}