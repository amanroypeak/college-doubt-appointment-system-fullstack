import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

function ProfessorList() {

    const { professors, aToken, getAllProfessors,changeAvailability } = useContext(AdminContext)

    useEffect(() => {

        if (aToken) {
            getAllProfessors()
        }

    }, [aToken])

    return (

        <div className='m-5 w-full'>

            <h1 className='text-2xl font-bold mb-6'>
                All Professors
            </h1>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>

                {
                    professors.map((item, index) => (

                        <div
                            key={index}
                            className='border rounded-xl overflow-hidden bg-white shadow-md hover:translate-y-[-5px] transition-all duration-300'
                        >

                            <img
                                className='w-full h-56 object-cover'
                                src={item.image}
                                alt=""
                            />

                            <div className='p-4'>

                                <p className='text-lg font-semibold text-gray-800'>
                                    {item.name}
                                </p>

                                <p className='text-sm text-gray-500 mt-1'>
                                    {item.speciality}
                                </p>

                                {/* available section */}

                                <div className='flex items-center gap-2 mt-3'>

                                    <input onChange={() => changeAvailability(item._id)}
                                        type="checkbox"
                                        checked={item.available}
                                        
                                    />

                                    <p className={`text-sm font-medium ${item.available ? 'text-green-600' : 'text-red-500'}`}>

                                        {item.available ? 'Available' : 'Unavailable'}

                                    </p>

                                </div>

                            </div>

                        </div>

                    ))
                }

            </div>

        </div>

    )
}

export default ProfessorList