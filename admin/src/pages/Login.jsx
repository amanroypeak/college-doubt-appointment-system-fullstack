import React, { useContext, useState } from 'react'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { ProfessorContext } from '../context/ProfessorContext'

function Login() {

    const [state, setState] = useState('Admin')
    const [email,setEmail] = useState('')
     const [password,setPassword] = useState('')
    const {setAToken,backendUrl} = useContext(AdminContext)
    const {setDToken} =useContext(ProfessorContext)

    const onSubmitHadler = async (event) =>{
        event.preventDefault()

        try {
            if(state=== 'Admin'){
                const {data} = await axios.post(backendUrl + '/api/admin/login',{email,password})
                if(data.success){
                    localStorage.setItem('aToken',data.token)
                    setAToken(data.token);
                    
                }else{
                    toast.error(data.message)
                }



            }else{

                const {data} = await axios.post(backendUrl + '/api/professor/login',{email,password})
                if(data.success){
                    localStorage.setItem('dToken',data.token)
                    setDToken(data.token);
                    console.log(data.token)
                    
                }else{
                    toast.error(data.message)
                }




            }
            
        } catch (error) {
            toast.error(error.message)
            
        }

    }
    

    return (

        <div className='min-h-screen flex items-center justify-center bg-gray-100'>

            <form onSubmit={onSubmitHadler} className='bg-white p-8 rounded-2xl shadow-lg w-[350px]'>

                {/* Heading */}

                <div className='mb-6 text-center'>

                    <p className='text-2xl font-bold text-gray-800'>
                        {state} Login
                    </p>

                    <p className='text-sm text-gray-500 mt-1'>
                        Please login to continue
                    </p>

                </div>

                {/* Email */}

                <div className='mb-4'>

                    <p className='text-sm font-medium text-gray-700 mb-1'>
                        Email
                    </p>

                    <input
                    onChange={(e)=>setEmail(e.target.value)} value = {email}
                        type="email"
                        placeholder='Enter your email'
                        required
                        className='w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-blue-500'
                    />

                </div>

                {/* Password */}

                <div className='mb-5'>

                    <p className='text-sm font-medium text-gray-700 mb-1'>
                        Password
                    </p>

                    <input
                     onChange={(e)=>setPassword(e.target.value)} value = {password}
                        type="password"
                        placeholder='Enter your password'
                        required
                        className='w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-blue-500'
                    />

                </div>

                {/* Button */}

                <button
                    className='w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-all'
                >
                    Login
                </button>

                {/* Toggle Login */}

                <p className='text-sm text-center mt-5 text-gray-600'>

                    {
                        state === 'Admin'
                            ? 'Professor Login? '
                            : 'Admin Login? '
                    }

                    <span
                        onClick={() =>
                            setState(state === 'Admin' ? 'Professor' : 'Admin')
                        }
                        className='text-blue-600 cursor-pointer font-medium hover:underline'
                    >

                        Click Here

                    </span>

                </p>

            </form>

        </div>
    )
}

export default Login