
import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

function AddProfessors() {

    const aToken = localStorage.getItem('aToken')

    const [profImg, setProfImg] = useState(false)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [speciality, setSpeciality] = useState('')

    // Loading state
    const [loading, setLoading] = useState(false)
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const onSubmitHandler = async (event) => {

        event.preventDefault()

        try {

            // Start uploading
            setLoading(true)

            const formData = new FormData()

            formData.append('image', profImg)
            formData.append('name', name)
            formData.append('email', email)
            formData.append('password', password)
            formData.append('speciality', speciality)

            const { data } = await axios.post(
                 backendUrl + '/api/admin/add-professor',
                formData,
                {
                    headers: {
                        atoken: aToken
                    }
                }
            )

            if (data.success) {

                toast.success(data.message)

                // clear fields
                setProfImg(false)
                setName('')
                setEmail('')
                setPassword('')
                setSpeciality('')

            } else {
                toast.error(data.message)
            }

        } catch (error) {

            console.log(error)
            toast.error(error.message)

        } finally {

            // Stop uploading
            setLoading(false)

        }

    }

    return (

        <form onSubmit={onSubmitHandler} className='m-5 w-full'>

            <p className='mb-3 text-lg font-medium'>
                Add Professor
            </p>

            <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl'>

                {/* image upload */}

                <div className='flex items-center gap-4 mb-8 text-gray-500'>

                    <label htmlFor="prof-img">

                        <img
                            className='w-20 h-20 bg-gray-100 rounded-full cursor-pointer object-cover'
                            src={
                                profImg
                                    ? URL.createObjectURL(profImg)
                                    : 'https://cdn-icons-png.flaticon.com/512/3177/3177440.png'
                            }
                            alt=""
                        />

                    </label>

                    <input
                        onChange={(e) => setProfImg(e.target.files[0])}
                        type="file"
                        id='prof-img'
                        hidden
                        required
                    />

                    <p>
                        Upload Professor <br /> Picture
                    </p>

                </div>

                {/* form inputs */}

                <div className='flex flex-col gap-4'>

                    <div className='flex flex-col gap-1'>
                        <p>Professor Name</p>

                        <input
                            type="text"
                            placeholder='Enter name'
                            className='border rounded px-3 py-2'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className='flex flex-col gap-1'>
                        <p>Professor Email</p>

                        <input
                            type="email"
                            placeholder='Enter email'
                            className='border rounded px-3 py-2'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className='flex flex-col gap-1'>
                        <p>Password</p>

                        <input
                            type="password"
                            placeholder='Enter password'
                            className='border rounded px-3 py-2'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className='flex flex-col gap-1'>
                        <p>Speciality</p>

                        <input
                            type="text"
                            placeholder='Enter speciality'
                            className='border rounded px-3 py-2'
                            value={speciality}
                            onChange={(e) => setSpeciality(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type='submit'
                        disabled={loading}
                        className='bg-blue-600 text-white py-3 px-10 rounded mt-4 hover:bg-blue-700 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed'
                    >
                        {loading ? 'Uploading...' : 'Upload Professor'}
                    </button>

                </div>

            </div>

        </form>

    )
}

export default AddProfessors


