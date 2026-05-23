import express from 'express'
import { addProfessor,allProfessors,loginAdmin,appointmentsAdmin,cancelAppointmentAdmin,adminDashboard} from '../controllers/adminController.js'
import upload from '../middlewares/multer.js'
import authadmin from '../middlewares/authadmin.js'
import { changeAvailability } from '../controllers/professorcontroller.js'

const adminrouter = express.Router()

adminrouter.post('/add-professor',authadmin, upload.single('image'),addProfessor)
adminrouter.post('/login',loginAdmin)
adminrouter.get('/all-professors',authadmin,allProfessors)
adminrouter.post('/change-availability',authadmin, changeAvailability)
adminrouter.get('/appointments',authadmin,appointmentsAdmin)
adminrouter.post('/cancel-appointment',  authadmin, cancelAppointmentAdmin)
adminrouter.get('/dashboard',authadmin,adminDashboard)

export default adminrouter