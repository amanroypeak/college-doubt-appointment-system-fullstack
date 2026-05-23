import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import About from './Components/About/About.jsx'
import Home from './Components/Home/Home.jsx'
import Professors from './Components/Professors/Professors.jsx'
import Login from './Login/Login.jsx'
import Myprofile from './Components/Profile/Myprofile.jsx'
import MyAppointments from './Components/Appointments/MyAppointments.jsx'
import AllProfessors from './Components/AllProfessors/AllProfessors.jsx'
import Appointments from './Components/Appointmentss/Appointments.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='/' element = {<Home/>}/>
      <Route path='about' element = {<About/>}/>
      <Route path='/allprofessors' element = {<AllProfessors/>}/>
      <Route path='/login' element = {<Login/>}/>
      <Route path='/profile' element = {<Myprofile/>}/>
      <Route path='/Appointments/:id' element = {<MyAppointments/>}/>
      <Route path="/allprofessors/:category" element={<Professors/>} />
      <Route path="/Appointments" element={<Appointments/>} />
     
     
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
