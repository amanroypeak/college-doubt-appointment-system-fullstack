import { createContext } from "react"
import { useState } from "react"
import axios from 'axios'
import {toast} from 'react-toastify'


export const AdminContext = createContext()

const AdminContextProvider = (props) => {
    const [aToken,setAToken] = useState(localStorage.getItem('aToken')?localStorage.getItem('aToken'):'')
    const [professors,setProfessors] = useState([])
    const [appointments,setAppointments] = useState([])
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [dashData, setDashData] = useState(false)
    const getAllProfessors = async () => {
        try {

            const {data} = await axios.get(backendUrl + '/api/admin/all-professors', {headers:{atoken:aToken}})
            if(data.success){
                setProfessors(data.professors)
                console.log(data.professors);
                
            }
            else{
                toast.error(data.message)
                
            }

            
        } catch (error) {

            toast.error(error.message)
            
        }
        
    }

    const changeAvailability = async (ProfId) => {
        try {

            const {data} = await axios.post(backendUrl + '/api/admin/change-availability',{ProfId},{headers:{aToken}})
            if (data.success){
                toast.success(data.message)
                getAllProfessors()
            }else {
                toast.error(data.message)
            }
        } catch (error) {
             toast.error(error.message)
            
            
        }
        
    }
    const getAllAppointments = async () => {
        try {

            const {data} = await axios.get(backendUrl+'/api/admin/appointments' ,{headers:{aToken}})

            if(data.success){

                setAppointments(data.appointments)
            }else{
                toast.error(data.message)
            }
            
        } catch (error) {

             toast.error(error.message)
            
        }
        
    }
    const cancelAppointment = async (appointmentId) => {

    try {

        const { data } = await axios.post(
            backendUrl + '/api/admin/cancel-appointment',
            { appointmentId },
            { headers: { aToken } }
        )

        if (data.success) {

            toast.success(data.message)

            getAllAppointments()

        } else {

            toast.error(data.message)
        }

    } catch (error) {

        toast.error(error.message)
    }
}


const getDashData = async () => {

    try {

        const { data } = await axios.get(
            backendUrl + '/api/admin/dashboard',
            {
                headers: { aToken }
            }
        )

        if (data.success) {

            setDashData(data.dashData)

        } else {

            toast.error(data.message)

        }

    } catch (error) {

        toast.error(error.message)

    }

}


const deleteProfessor = async (id) => {

    try {

        const { data } = await axios.delete(
            backendUrl + '/api/admin/delete-professor',
            {
                headers: {
                    atoken: aToken
                },
                data: {
                    id: id
                }
            }
        )

        if (data.success) {
            toast.success(data.message)
            getAllProfessors()
        } else {
            toast.error(data.message)
        }

    } catch (error) {
        toast.error(error.message)
    }

}


    const value = {
        aToken,setAToken,backendUrl,professors,getAllProfessors,changeAvailability,appointments,setAppointments,getAllAppointments,cancelAppointment,dashData, getDashData
    , deleteProfessor}

    return (
        <AdminContext.Provider value = {value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider