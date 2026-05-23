import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AdminContext } from '../context/AdminContext'
import { ProfessorContext } from '../context/ProfessorContext'
import { assets } from '../assets/assets'

function Sidebar() {

    const { aToken } = useContext(AdminContext)
    const { dToken } = useContext(ProfessorContext)

    return (

        <div className='min-h-screen bg-white border-r w-16 md:w-64'>

            {/* ADMIN SIDEBAR */}
            
            {aToken ? (

                <ul className='mt-5'>

                    <NavLink to='/admin-dashboard'
                        className={({ isActive }) =>
                            `flex items-center gap-3 py-3 px-4 md:px-9 border-r-4 transition-all duration-200
                            ${isActive ? 'bg-orange-50 border-orange-500 text-orange-500' : 'border-transparent text-gray-700 hover:bg-gray-100'}`
                        }>
                        <img className='w-5 h-5 min-w-[20px]' src={assets.home_icon} alt="" />
                        <p className='hidden md:block'>Dashboard</p>
                    </NavLink>

                    <NavLink to='/all-appointments'
                        className={({ isActive }) =>
                            `flex items-center gap-3 py-3 px-4 md:px-9 border-r-4 transition-all duration-200
                            ${isActive ? 'bg-orange-50 border-orange-500 text-orange-500' : 'border-transparent text-gray-700 hover:bg-gray-100'}`
                        }>
                        <img className='w-5 h-5 min-w-[20px]' src={assets.appointment_icon} alt="" />
                        <p className='hidden md:block'>Appointments</p>
                    </NavLink>

                    <NavLink to='/add-professor'
                        className={({ isActive }) =>
                            `flex items-center gap-3 py-3 px-4 md:px-9 border-r-4 transition-all duration-200
                            ${isActive ? 'bg-orange-50 border-orange-500 text-orange-500' : 'border-transparent text-gray-700 hover:bg-gray-100'}`
                        }>
                        <img className='w-5 h-5 min-w-[20px]' src={assets.add_icon} alt="" />
                        <p className='hidden md:block'>Add Professor</p>
                    </NavLink>

                    <NavLink to='/professor-list'
                        className={({ isActive }) =>
                            `flex items-center gap-3 py-3 px-4 md:px-9 border-r-4 transition-all duration-200
                            ${isActive ? 'bg-orange-50 border-orange-500 text-orange-500' : 'border-transparent text-gray-700 hover:bg-gray-100'}`
                        }>
                        <img className='w-5 h-5 min-w-[20px]' src={assets.people_icon} alt="" />
                        <p className='hidden md:block'>Professor List</p>
                    </NavLink>

                </ul>

            ) : dToken ? (

                /*  PROFESSOR SIDEBAR  */

                <ul className='mt-5'>

                    <NavLink to='/professor-dashboard'
                        className={({ isActive }) =>
                            `flex items-center gap-3 py-3 px-4 md:px-9 border-r-4 transition-all duration-200
                            ${isActive ? 'bg-orange-50 border-orange-500 text-orange-500' : 'border-transparent text-gray-700 hover:bg-gray-100'}`
                        }>
                        <img className='w-5 h-5 min-w-[20px]' src={assets.home_icon} alt="" />
                        <p className='hidden md:block'>Dashboard</p>
                    </NavLink>

                    <NavLink to='/professor-appointment'
                        className={({ isActive }) =>
                            `flex items-center gap-3 py-3 px-4 md:px-9 border-r-4 transition-all duration-200
                            ${isActive ? 'bg-orange-50 border-orange-500 text-orange-500' : 'border-transparent text-gray-700 hover:bg-gray-100'}`
                        }>
                        <img className='w-5 h-5 min-w-[20px]' src={assets.appointment_icon} alt="" />
                        <p className='hidden md:block'>Appointments</p>
                    </NavLink>

                    <NavLink to='/professor-profile'
                        className={({ isActive }) =>
                            `flex items-center gap-3 py-3 px-4 md:px-9 border-r-4 transition-all duration-200
                            ${isActive ? 'bg-orange-50 border-orange-500 text-orange-500' : 'border-transparent text-gray-700 hover:bg-gray-100'}`
                        }>
                        <img className='w-5 h-5 min-w-[20px]' src={assets.people_icon} alt="" />
                        <p className='hidden md:block'>Profile</p>
                    </NavLink>

                </ul>

            ) : null}

        </div>
    )
}

export default Sidebar