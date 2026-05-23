import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

function AllAppointments() {

    const {
        aToken,
        appointments,
        getAllAppointments,
        cancelAppointment
    } = useContext(AdminContext)

    useEffect(() => {

        if (aToken) {
            getAllAppointments()
        }

    }, [aToken])

    return (

        <div className='w-full max-w-7xl m-5'>

            <p className='mb-3 text-lg font-medium'>
                All Appointments
            </p>

            <div className='bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll'>

                {/* ---------- TABLE HEADER ---------- */}

                <div className='hidden md:grid grid-cols-[0.5fr_2fr_2fr_2fr_1fr_1fr] py-3 px-6 border-b font-semibold'>

                    <p>#</p>
                    <p>Student</p>
                    <p>Date & Time</p>
                    <p>Professor</p>
                    <p>Status</p>
                    <p>Action</p>

                </div>

                {/* ---------- APPOINTMENTS ---------- */}

                {
                    appointments.map((item, index) => (

                        <div
                            className='flex flex-wrap justify-between md:grid md:grid-cols-[0.5fr_2fr_2fr_2fr_1fr_1fr] items-center text-gray-600 py-4 px-6 border-b hover:bg-gray-50'
                            key={index}
                        >

                            {/* NUMBER */}

                            <p className='max-md:hidden'>
                                {index + 1}
                            </p>

                            {/* STUDENT */}

                            <div className='flex items-center gap-3'>

                                <img
                                    className='w-10 h-10 rounded-full object-cover'
                                    src={item.userData?.image}
                                    alt=""
                                />

                                <p>
                                    {item.userData?.name}
                                </p>

                            </div>

                            {/* DATE + TIME */}

                            <div>

                                <p>
                                    {item.slotDate}
                                </p>

                                <p className='text-xs text-gray-500'>
                                    {item.slotTime}
                                </p>

                            </div>

                            {/* PROFESSOR */}

                            <div className='flex items-center gap-3'>

                                <img
                                    className='w-10 h-10 rounded-full object-cover'
                                    src={item.profData?.image}
                                    alt=""
                                />

                                <p>
                                    {item.profData?.name}
                                </p>

                            </div>

                            {/* STATUS */}

                            <div>

                                {
                                    item.cancelled ? (
                                        <p className='text-red-500 font-medium'>Cancelled</p>
                                    ) : item.isCompleted ? (
                                        <p className='text-green-600 font-medium'>Completed</p>
                                    ) : (
                                        <p className='text-green-500 font-medium'>Active</p>
                                    )
                                }

                            </div>

                            {/* ACTION */}

                            <div>

                                {
                                    item.cancelled || item.isCompleted ? (
                                        <p className='text-gray-400'>Done</p>
                                    ) : (
                                        <button
                                            onClick={() => cancelAppointment(item._id)}
                                            className='border border-red-500 text-red-500 px-4 py-1 rounded hover:bg-red-500 hover:text-white transition-all'
                                        >
                                            Cancel
                                        </button>
                                    )
                                }

                            </div>

                        </div>

                    ))
                }

            </div>

        </div>

    )
}

export default AllAppointments