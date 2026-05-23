import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

function Dashboard() {

    const {
        aToken,
        dashData,
        getDashData
    } = useContext(AdminContext)

    useEffect(() => {

        if (aToken) {
            getDashData()
        }

    }, [aToken])

    return dashData && (

        <div className='m-5'>

            <h1 className='text-2xl font-bold mb-8'>
                Admin Dashboard
            </h1>

            {/*  CARDS  */}

            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>

                {/* PROFESSORS */}

                <div className='bg-white shadow rounded-xl p-6 border'>

                    <h2 className='text-lg text-gray-500'>
                        Total Professors
                    </h2>

                    <p className='text-4xl font-bold mt-3 text-blue-600'>
                        {dashData.professors}
                    </p>

                </div>

                {/* APPOINTMENTS */}

                <div className='bg-white shadow rounded-xl p-6 border'>

                    <h2 className='text-lg text-gray-500'>
                        Total Appointments
                    </h2>

                    <p className='text-4xl font-bold mt-3 text-green-600'>
                        {dashData.appointments}
                    </p>

                </div>

                {/* STUDENTS */}

                <div className='bg-white shadow rounded-xl p-6 border'>

                    <h2 className='text-lg text-gray-500'>
                        Total Students
                    </h2>

                    <p className='text-4xl font-bold mt-3 text-red-500'>
                        {dashData.students}
                    </p>

                </div>

            </div>

        </div>

    )
}

export default Dashboard