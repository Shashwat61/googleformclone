import { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router'
import twitter from '../assets/form.png'
import { auth, provider } from "../firebase"
import User from '../services/userServices'

function Login() {
    const [user]=useAuthState(auth)
    const navigate=useNavigate()

    useEffect(()=>{
      if(user) {
        User.login(user)      
        navigate('/') 
    }
    },[user])

    function signIn(){
      try{
        auth.signInWithPopup(provider)
        
      }catch(e){
          console.log(e)
      }
    }

    return (
        <div className="grid h-screen place-items-center bg-bgchat">
        <div className="grid p-10 rounded-md sm:p-16 place-items-center bg-graylight drop-shadow-lg">
        <img className=" object-contain h-32 w-32"  src={twitter} alt=""/>
       <button onClick={signIn} className="px-4 py-2 mt-6 text-sm rounded-md  cursor-pointer sm:text-base bg-blue-500 hover:opacity-80 focus:outline-none">Sign In With Google</button> 
        </div>
    </div>
    )
}

export default Login
