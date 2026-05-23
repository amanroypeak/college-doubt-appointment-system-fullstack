import './App.css'
import { Outlet } from 'react-router-dom'
import Footer from './Components/Footer/Footer'
import Header from './Components/Header/Header'
import { TeacherContextProvider } from './Components/Contexts/Context'
import { Teachers } from './assets/Use'
import { ToastContainer, toast } from 'react-toastify';
function App() {
  
  return (
    <>
    <TeacherContextProvider>
      <ToastContainer/>
     <Header/>
     <Outlet/>
     <Footer/>
     </TeacherContextProvider>
    </>
  )
}

export default App
