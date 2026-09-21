import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios'
import { toast } from 'react-toastify'

export const TeacherContext = createContext()

export const TeacherContextProvider = ({ children }) => {

  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const [professors, setProfessors] = useState([])
  const [loading, setLoading] = useState(true);

  const [token, setToken] = useState(
    localStorage.getItem('token')
      ? localStorage.getItem('token')
      : ''
  )
  const [userData,setUserData] = useState(false)

 const getProfessorsData = async () => {

  try {

    const { data } = await axios.get(
      backendUrl + '/api/professor/list'
    )

    if (data.success) {

      setProfessors(data.professors)

    } else {

      toast.error(data.message)

    }

  } catch (error) {

    console.log(error)
    toast.error(error.message)

  } finally {

    setLoading(false)
  }
}
  

  const loadUserProfileData = async () => {
    try {

      const {data} = await axios.get(backendUrl + '/api/user/get-profile', {headers:{token}})
      if (data.success) {
        setUserData(data.userData)
        
      }else{
        toast.error(data.message)
      }
      
    } catch (error) {
      console.log(error)
      toast.error(error.message)

    }
  }


  const value = {
    professors,
    backendUrl,
    token,
    setToken,
    getProfessorsData,
    userData ,setUserData,loadUserProfileData, loading
  }

  useEffect(() => {
    getProfessorsData()
  }, [])

  useEffect(()=>{

    if(token){
      loadUserProfileData()
    }else{
      setUserData(false)
    }

  },[token])

  return (
    <TeacherContext.Provider value={value}>
      {children}
    </TeacherContext.Provider>
  )
}

export default function useTeacher() {
  return useContext(TeacherContext)
}