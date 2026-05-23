import React, { useContext, useEffect } from 'react'
import { ProfessorContext } from '../../context/ProfessorContext'

function ProfessorAppointment() {

    const {

        dToken,
        appointments,
        getAppointments,
        completeAppointment,
        cancelAppointment

    } = useContext(ProfessorContext)



    useEffect(() => {

        if(dToken){

            getAppointments()

        }

    }, [dToken])



    return (

        <div className='w-full max-w-6xl m-5'>

            <p className='mb-3 text-lg font-medium'>
                My Appointments
            </p>



            <div className='bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll'>

                <div className='hidden md:grid grid-cols-[0.5fr_2fr_2fr_2fr_2fr_1fr] gap-1 py-3 px-6 border-b font-medium'>

                    <p>#</p>
                    <p>Student</p>
                    <p>Date & Time</p>
                    <p>Status</p>
                    <p>Actions</p>

                </div>



                {

                    appointments.map((item,index)=>(

                        <div
                            className='flex flex-wrap justify-between max-md:gap-5 max-md:text-base sm:grid sm:grid-cols-[0.5fr_2fr_2fr_2fr_2fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50'
                            key={index}
                        >

                            <p>{index+1}</p>



                            <div className='flex items-center gap-2'>

                                <img
                                    className='w-8 rounded-full'
                                    src={item.userData.image}
                                    alt=""
                                />

                                <p>{item.userData.name}</p>

                            </div>



                            <div>

                                <p>{item.slotDate}</p>

                                <p>{item.slotTime}</p>

                            </div>



                            <div>

                                {

                                    item.cancelled
                                    ?

                                    <p className='text-red-500'>
                                        Cancelled
                                    </p>

                                    :

                                    item.isCompleted
                                    ?

                                    <p className='text-green-500'>
                                        Completed
                                    </p>

                                    :

                                    <p className='text-blue-500'>
                                        Active
                                    </p>

                                }

                            </div>



                            <div className='flex gap-2'>

                                {

                                    !item.cancelled
                                    && !item.isCompleted
                                    &&

                                    <>
                                    
                                        <button
                                            onClick={()=>completeAppointment(item._id)}
                                            className='px-3 py-1 bg-green-500 text-white rounded'
                                        >
                                            Complete
                                        </button>



                                        <button
                                            onClick={()=>cancelAppointment(item._id)}
                                            className='px-3 py-1 bg-red-500 text-white rounded'
                                        >
                                            Cancel
                                        </button>

                                    </>

                                }

                            </div>

                        </div>

                    ))

                }

            </div>

        </div>

    )

}

export default ProfessorAppointment