import mongoose from 'mongoose'

const professorSchema = new mongoose.Schema({
    name: {
        type: String, required: true
    },
    image: {
        type: String, required: true
    },
    speciality: {
        type: String, required: true
    },
    email: {
        type: String, required: true
    },
    password: {
        type: String, required: true
    },
    date: {
        type: Number, required: true
    },
    slots_booked: {
        type: Object, default: {}
    },
    available:{
   type:Boolean,
   default:true
},

}, { minimize: false }
)

const professorModel = mongoose.models.professor || mongoose.model('professor',professorSchema)

export default professorModel


