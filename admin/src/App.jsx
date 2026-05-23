import React from 'react'
import Login from './pages/Login'
import { useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import AllAppointments from './pages/Admin/AllAppointments';
import AddProfessors from './pages/Admin/AddProfessors';
import Dashboard from './pages/Admin/Dashboard'
import ProfessorList from './pages/Admin/ProfessorList';
import { ProfessorContext } from './context/ProfessorContext';
import ProfessorDashboard from './pages/Professor/ProfessorDashboard';
import ProfessorAppointment from './pages/Professor/ProfessorAppointment';
import ProfessorProfile from './pages/Professor/ProfessorProfile';


function App() {

  const { aToken } = useContext(AdminContext)
  const { dToken } = useContext(ProfessorContext)

  return aToken || dToken ? (

    <div className='bg-white'>

      <ToastContainer />

      <Navbar />

      <div className='flex items-start'>

        <Sidebar />

        <Routes>

          {/* ---------------- ADMIN ROUTES ---------------- */}

          {
            aToken && (
              <>
                <Route path='/' element={<Dashboard />} />
                <Route path='/admin-dashboard' element={<Dashboard />} />
                <Route path='/all-appointments' element={<AllAppointments />} />
                <Route path='/add-professor' element={<AddProfessors />} />
                <Route path='/professor-list' element={<ProfessorList />} />
              </>
            )
          }

          {/* ---------------- PROFESSOR ROUTES ---------------- */}

          {
            dToken && (
              <>
                <Route path='/' element={<ProfessorDashboard />} />
                <Route path='/professor-dashboard' element={<ProfessorDashboard />} />
                <Route path='/professor-appointment' element={<ProfessorAppointment />} />
                <Route path='/professor-profile' element={<ProfessorProfile />} />
              </>
            )
          }

        </Routes>

      </div>

    </div>

  ) : (

    <>
      <Login />
      <ToastContainer />
    </>

  )
}

export default App