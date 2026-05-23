import React, { useEffect, useState } from 'react'
import useTeacher from '../Components/Contexts/Context'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function Login() {

    const { backendUrl, token, setToken } = useTeacher()

    const [state, setState] = useState('Signup')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const onSubmitHandler = async (event) => {

        event.preventDefault()

        try {

            if (state === 'Signup') {

                const { data } = await axios.post(
                    backendUrl + '/api/user/register',
                    { name, email, password }
                )

                if (data.success) {

                    localStorage.setItem('token', data.token)
                    setToken(data.token)

                    toast.success('Account Created Successfully')

                } else {
                    toast.error(data.message)
                }

            } else {

                const { data } = await axios.post(
                    backendUrl + '/api/user/login',
                    { email, password }
                )

                if (data.success) {

                    localStorage.setItem('token', data.token)
                    setToken(data.token)

                    toast.success('Login Successful')

                } else {
                    toast.error(data.message)
                }
            }

        } catch (error) {

            toast.error(error.message)

        }
    }

    useEffect(() => {

        if (token ) {
            navigate('/')
        }

    }, [token])

    return (
        <>
            <form
                onSubmit={onSubmitHandler}
                className='min-h-[80vh] flex items-center'
            >

                <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>

                    <p className='text-2xl font-semibold'>
                        {state === "Signup" ? "Create Account" : "Login"}
                    </p>

                    <p>
                        Please {state === "Signup" ? "Sign Up" : "Login"} to book appointment
                    </p>

                    {state === "Signup" &&

                        <div className='w-full'>

                            <p>Full Name</p>

                            <input
                                className='border border-zinc-300 rounded w-full p-2 mt-1'
                                type="text"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                required
                            />

                        </div>
                    }

                    <div className='w-full'>

                        <p>Email</p>

                        <input
                            className='border border-zinc-300 rounded w-full p-2 mt-1'
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                        />

                    </div>

                    <div className='w-full'>

                        <p>Password</p>

                        <input
                            className='border border-zinc-300 rounded w-full p-2 mt-1'
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                        />

                    </div>

                    <button
                        type='submit'
                        className='bg-slate-800 text-white w-full py-2 rounded-md text-base'
                    >
                        {state === "Signup" ? "Create Account" : "Login"}
                    </button>

                    {
                        state === "Signup"
                            ? (
                                <p>
                                    Already have an account?
                                    <span
                                        onClick={() => setState("Login")}
                                        className='text-cyan-700 underline cursor-pointer'
                                    >
                                        {' '}Login here
                                    </span>
                                </p>
                            )
                            : (
                                <p>
                                    Create a new account?
                                    <span
                                        onClick={() => setState("Signup")}
                                        className='text-cyan-700 underline cursor-pointer'
                                    >
                                        {' '}Create Account
                                    </span>
                                </p>
                            )
                    }

                </div>

            </form>
        </>
    )
}

export default Login