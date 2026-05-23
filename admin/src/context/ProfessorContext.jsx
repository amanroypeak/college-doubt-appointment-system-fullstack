import axios from "axios"
import { useState, createContext } from "react"
import { toast } from 'react-toastify'

export const ProfessorContext = createContext()

const ProfessorContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [dToken, setDToken] = useState(
        localStorage.getItem('dToken')
            ? localStorage.getItem('dToken')
            : ''
    )

    const [appointments, setAppointments] = useState([])

    const [profileData,setProfileData] = useState(false)             
    const [dashData,setDashData] = useState(false)



    // GET APPOINTMENTS

    const getAppointments = async () => {

        try {

            const {data} = await axios.get(
                backendUrl + '/api/professor/appointments',
                {
                    headers:{dtoken:dToken}
                }
            )

            if(data.success){

                setAppointments(data.appointments.reverse())

            }

            else{

                toast.error(data.message)

            }

        } catch (error) {

            console.log(error)

            toast.error(error.message)

        }

    }



    // COMPLETE

    const completeAppointment = async (appointmentId) => {

        try {

            const {data} = await axios.post(
                backendUrl + '/api/professor/complete-appointment',
                {appointmentId},
                {
                    headers:{dtoken:dToken}
                }
            )

            if(data.success){

                toast.success(data.message)

                getAppointments()

            }

            else{

                toast.error(data.message)

            }

        } catch (error) {

            toast.error(error.message)

        }

    }



    // CANCEL

    const cancelAppointment = async (appointmentId) => {

        try {

            const {data} = await axios.post(
                backendUrl + '/api/professor/cancel-appointment',
                {appointmentId},
                {
                    headers:{dtoken:dToken}
                }
            )

            if(data.success){

                toast.success(data.message)

                getAppointments()

            }

            else{

                toast.error(data.message)

            }

        } catch (error) {

            toast.error(error.message)

        }

    }








    const getProfileData = async () => {

    try {

        const {data} = await axios.get(
            backendUrl + '/api/professor/profile',
            {
                headers:{dtoken:dToken}
            }
        )

        if(data.success){

            setProfileData(data.profileData)

        }else{

            toast.error(data.message)

        }

    } catch (error) {

        console.log(error)
        toast.error(error.message)

    }

}




const getDashData = async () => {

    try {

        const {data} = await axios.get(

            backendUrl + '/api/professor/dashboard',

            {
                headers:{dtoken:dToken}
            }

        )

        if(data.success){

            setDashData(data.dashData)

        }else{

            toast.error(data.message)

        }

    } catch (error) {

        console.log(error)
        toast.error(error.message)

    }

}



    const value = {

        dToken,
        setDToken,
        backendUrl,

        appointments,
        setAppointments,

        getAppointments,

        completeAppointment,
        cancelAppointment,

        profileData,
setProfileData,
getProfileData,dashData,
getDashData
    }

    return (

        <ProfessorContext.Provider value={value}>

            {props.children}

        </ProfessorContext.Provider>

    )

}

export default ProfessorContextProvider