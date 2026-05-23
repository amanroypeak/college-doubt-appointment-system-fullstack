import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminrouter from './routes/adminroute.js'
import professorRouter from './routes/professorroute.js'
import userRouter from './routes/userRoute.js'
import userModel from './models/usermodel.js'


//app config

const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()



//middlewares

app.use(express.json())
app.use(cors())

//api endpoint
app.use('/api/admin', adminrouter) //localhost:4000/api/admin/add-professor
app.use('/api/professor', professorRouter)
app.use('/api/user',userRouter)

app.get ('/', (req,res) =>{
    res.send ('API working great')
} )


app.listen(port,() => console.log("Server Started", port))