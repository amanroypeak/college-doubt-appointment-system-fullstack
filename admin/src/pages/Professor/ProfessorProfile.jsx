import React, { useContext, useEffect } from 'react'
import { ProfessorContext } from '../../context/ProfessorContext'
import axios from 'axios'
import { toast } from 'react-toastify'

function ProfessorProfile() {

    const {
        dToken,
        backendUrl,
        profileData,
        getProfileData,
        setProfileData
    } = useContext(ProfessorContext)

    useEffect(() => {

        if (dToken) {
            getProfileData()
        }

    }, [dToken])


    const updateAvailability = async () => {

        try {

            const { data } = await axios.post(

                backendUrl + '/api/professor/update-availability',

                {
                    available: !profileData.available
                },

                {
                    headers: { dtoken: dToken }
                }

            )

            if (data.success) {

                toast.success(data.message)

                setProfileData(prev => ({
                    ...prev,
                    available: !prev.available
                }))

            } else {

                toast.error(data.message)

            }

        } catch (error) {

            console.log(error)
            toast.error(error.message)

        }

    }


    return profileData && (

        <div className='w-full min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8 lg:p-10'>

            <div className='max-w-5xl mx-auto bg-white rounded-2xl md:rounded-3xl shadow-xl overflow-hidden'>


                {/* TOP SECTION */}

                <div className='bg-gradient-to-r from-indigo-500 to-blue-600 h-28 sm:h-36 md:h-40 relative'>

                    <img
                        src={profileData.image}
                        alt=""
                        className='w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-2xl md:rounded-3xl object-cover border-4 border-white shadow-lg absolute left-1/2 -translate-x-1/2 sm:left-6 sm:translate-x-0 md:left-10 top-12 sm:top-14 md:top-16'
                    />

                </div>


                {/* CONTENT */}

                <div className='pt-20 sm:pt-24 px-5 sm:px-7 md:px-10 pb-7 md:pb-10'>

                    <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8'>


                        {/* LEFT */}

                        <div className='text-center sm:text-left min-w-0'>

                            <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 break-words'>
                                {profileData.name}
                            </h1>

                            <p className='text-gray-500 mt-2 text-sm sm:text-base md:text-lg break-all'>
                                {profileData.email}
                            </p>

                            <div className='mt-4 inline-flex items-center px-4 sm:px-5 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm sm:text-base'>
                                {profileData.speciality}
                            </div>

                        </div>


                        {/* RIGHT - AVAILABILITY */}

                        <div className='bg-gray-50 border rounded-2xl px-5 sm:px-6 md:px-8 py-5 sm:py-6 shadow-sm w-full lg:w-auto lg:min-w-[250px]'>

                            <h2 className='text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-5'>
                                Availability
                            </h2>

                            <label className='flex items-center justify-between gap-4 cursor-pointer'>

                                <span className='text-gray-600 font-medium text-sm sm:text-base'>
                                    Available for booking
                                </span>

                                <input
                                    type="checkbox"
                                    checked={profileData.available}
                                    onChange={updateAvailability}
                                    className='w-5 h-5 cursor-pointer flex-shrink-0'
                                />

                            </label>


                            <div className='mt-5'>

                                {
                                    profileData.available ? (

                                        <span className='inline-block px-4 py-2 rounded-full bg-green-100 text-green-600 font-semibold text-xs sm:text-sm'>
                                            Active
                                        </span>

                                    ) : (

                                        <span className='inline-block px-4 py-2 rounded-full bg-red-100 text-red-500 font-semibold text-xs sm:text-sm'>
                                            Not Available
                                        </span>

                                    )
                                }

                            </div>

                        </div>

                    </div>


                    {/* EXTRA INFO SECTION */}

                    <div className='mt-8 md:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>


                        {/* EXPERIENCE */}

                        <div className='bg-indigo-50 rounded-2xl p-5 md:p-6 shadow-sm'>

                            <h3 className='text-base sm:text-lg font-semibold text-indigo-700'>
                                Experience
                            </h3>

                            <p className='text-gray-600 mt-2 text-sm sm:text-base'>
                                Expert Faculty Member
                            </p>

                        </div>


                        {/* DEPARTMENT */}

                        <div className='bg-blue-50 rounded-2xl p-5 md:p-6 shadow-sm'>

                            <h3 className='text-base sm:text-lg font-semibold text-blue-700'>
                                Department
                            </h3>

                            <p className='text-gray-600 mt-2 text-sm sm:text-base break-words'>
                                {profileData.speciality}
                            </p>

                        </div>


                        {/* STATUS */}

                        <div className='bg-green-50 rounded-2xl p-5 md:p-6 shadow-sm'>

                            <h3 className='text-base sm:text-lg font-semibold text-green-700'>
                                Status
                            </h3>

                            <p className='text-gray-600 mt-2 text-sm sm:text-base'>
                                {
                                    profileData.available
                                        ? 'Currently Accepting Appointments'
                                        : 'Currently Unavailable'
                                }
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    )
}

export default ProfessorProfile
