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

        <div className='w-full min-h-screen bg-gray-50 p-6 md:p-10'>

            <div className='max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden'>

                {/* TOP SECTION */}

                <div className='bg-gradient-to-r from-indigo-500 to-blue-600 h-40 relative'>

                    <img
                        src={profileData.image}
                        alt=""
                        className='w-40 h-40 rounded-3xl object-cover border-4 border-white shadow-lg absolute left-10 top-16'
                    />

                </div>



                {/* CONTENT */}

                <div className='pt-24 px-10 pb-10'>

                    <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-6'>

                        {/* LEFT */}

                        <div>

                            <h1 className='text-4xl font-bold text-gray-800'>
                                {profileData.name}
                            </h1>

                            <p className='text-gray-500 mt-2 text-lg'>
                                {profileData.email}
                            </p>

                            <div className='mt-5 inline-flex items-center px-5 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold'>
                                {profileData.speciality}
                            </div>

                        </div>



                        {/* RIGHT */}

                        <div className='bg-gray-50 border rounded-2xl px-8 py-6 shadow-sm min-w-[250px]'>

                            <h2 className='text-xl font-semibold text-gray-800 mb-5'>
                                Availability
                            </h2>

                            <label className='flex items-center justify-between cursor-pointer'>

                                <span className='text-gray-600 font-medium'>
                                    Available for booking
                                </span>

                                <input
                                    type="checkbox"
                                    checked={profileData.available}
                                    onChange={updateAvailability}
                                    className='w-5 h-5 cursor-pointer'
                                />

                            </label>

                            <div className='mt-5'>

                                {
                                    profileData.available ? (

                                        <span className='px-4 py-2 rounded-full bg-green-100 text-green-600 font-semibold text-sm'>
                                            Active
                                        </span>

                                    ) : (

                                        <span className='px-4 py-2 rounded-full bg-red-100 text-red-500 font-semibold text-sm'>
                                            Not Available
                                        </span>

                                    )
                                }

                            </div>

                        </div>

                    </div>



                    {/* EXTRA INFO SECTION */}

                    <div className='mt-10 grid grid-cols-1 md:grid-cols-3 gap-6'>

                        <div className='bg-indigo-50 rounded-2xl p-6 shadow-sm'>

                            <h3 className='text-lg font-semibold text-indigo-700'>
                                Experience
                            </h3>

                            <p className='text-gray-600 mt-2'>
                                Expert Faculty Member
                            </p>

                        </div>

                        <div className='bg-blue-50 rounded-2xl p-6 shadow-sm'>

                            <h3 className='text-lg font-semibold text-blue-700'>
                                Department
                            </h3>

                            <p className='text-gray-600 mt-2'>
                                {profileData.speciality}
                            </p>

                        </div>

                        <div className='bg-green-50 rounded-2xl p-6 shadow-sm'>

                            <h3 className='text-lg font-semibold text-green-700'>
                                Status
                            </h3>

                            <p className='text-gray-600 mt-2'>
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