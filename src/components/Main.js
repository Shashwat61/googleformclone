import { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import EditForm from './EditForm'
import Home from './Home'
import Login from './Login'
import {useNavigate} from 'react-router-dom'
import { auth } from '../firebase'
import UserResponse from './UserResponse'

function Main() {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/form/:formId" element={<EditForm/>} />
            <Route path="/s/:formId" element={<UserResponse/>} />
        </Routes>
        </BrowserRouter>
    )
}

export default Main
