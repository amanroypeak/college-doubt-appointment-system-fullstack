import React, { useContext, useEffect } from 'react'
import { ProfessorContext } from '../../context/ProfessorContext'
import { assets } from '../../assets/assets'

function ProfessorDashboard() {

    const {
        dToken,
        dashData,
        getDashData
    } = useContext(ProfessorContext)

    useEffect(() => {

        if(dToken){
            getDashData()
        }

    },[dToken])



    return dashData && (

        <div className='w-full min-h-screen bg-gray-50 p-8'>

            <h1 className='text-3xl font-bold text-gray-800 mb-8'>
                Professor Dashboard
            </h1>



            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>

                {/* TOTAL APPOINTMENTS */}

                <div className='bg-white rounded-3xl shadow-lg p-8 flex items-center gap-6 hover:scale-105 transition-all duration-300'>

                    <div className='bg-blue-100 p-5 rounded-2xl'>

                        <img
                            className='w-12'
                            src={assets.appointment_icon}
                            alt=""
                        />

                    </div>

                    <div>

                        <p className='text-gray-500 text-lg'>
                            Total Appointments
                        </p>

                        <h2 className='text-4xl font-bold text-blue-600 mt-2'>
                            {dashData.appointments}
                        </h2>

                    </div>

                </div>



                {/* TOTAL STUDENTS */}

                <div className='bg-white rounded-3xl shadow-lg p-8 flex items-center gap-6 hover:scale-105 transition-all duration-300'>

                    <div className='bg-green-100 p-5 rounded-2xl'>

                        <img
                            className='w-12'
                            src={assets.people_icon}
                            alt=""
                        />

                    </div>

                    <div>

                        <p className='text-gray-500 text-lg'>
                            Total Students
                        </p>

                        <h2 className='text-4xl font-bold text-green-600 mt-2'>
                            {dashData.students}
                        </h2>

                    </div>

                </div>

            </div>

        </div>

    )
}

export default ProfessorDashboard