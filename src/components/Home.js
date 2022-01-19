import Navbar from "./Navbar"
import FormsContainer from './FormsContainer'
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../firebase"
import { useNavigate } from "react-router"
import { useEffect, useState } from "react"
import UserService from '../services/userServices'
function Home() {
    const [user]=useAuthState(auth)
    const [userId, setUserId]=useState('')
    const navigate=useNavigate()
    
    useEffect(()=>{
      if(!user) navigate('/login')
      else {
             const id=UserService.getCurrentUser()
             setUserId(id)
      }
    },[user])
    return (
        <div>
            <Navbar/>
            {/* need to show all the forms user has created, formsContainer, pass userid as prop into formcontainer  */}
            <FormsContainer id={userId?.id}/>
        </div>
    )
}

export default Home
// if the user is logged in, then the user will be redirected to the home page and if not then the user will be redirected to the login page.