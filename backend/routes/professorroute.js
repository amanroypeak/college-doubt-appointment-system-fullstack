import express from 'express'

import {
    professorList,
    loginProfessor,
    appointmentProfessor,
    completeAppointment,
    cancelAppointmentProfessor,professorProfile,
updateProfessorAvailability,professorDashboard
}
from '../controllers/professorcontroller.js'

import authprofessor from '../middlewares/authProfessor.js'

const professorRouter = express.Router()

professorRouter.get('/list', professorList)

professorRouter.post('/login', loginProfessor)

professorRouter.get('/appointments',authprofessor,appointmentProfessor)

professorRouter.post('/complete-appointment',authprofessor,completeAppointment)

professorRouter.post('/cancel-appointment',authprofessor,cancelAppointmentProfessor)

professorRouter.get('/profile',authprofessor,professorProfile)

professorRouter.post('/update-availability',authprofessor,updateProfessorAvailability)

professorRouter.get('/dashboard',authprofessor,professorDashboard)

export default professorRouter