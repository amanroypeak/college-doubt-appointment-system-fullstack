import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { ProfessorContext } from '../context/ProfessorContext'

function Navbar() {

    const { aToken, setAToken } = useContext(AdminContext)
    const {dToken , setDToken} =useContext(ProfessorContext)

    const navigate = useNavigate()

   const logout = () => {

  if (aToken) {

    localStorage.removeItem('aToken')
    setAToken('')

  }

  if (dToken) {

    localStorage.removeItem('dToken')
    setDToken('')

  }

  navigate('/')

}

    return (

        <div className='flex items-center justify-between px-6 py-4 border-b bg-white shadow-sm'>

            {/* Left Side */}

            <div className='flex items-center gap-3'>

                <img
                    className='w-20'
                    src={assets.Logo2}
                    alt=""
                />

                <p className='border px-4 py-1 rounded-full text-sm bg-gray-100 text-gray-700'>
                    {aToken ? 'Admin' : 'Professor'}
                </p>

            </div>

            {/* Right Side */}

            <button
                onClick={logout}
                className='bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-sm font-medium transition-all'
            >
                Logout
            </button>

        </div>

    )
}

export default Navbar