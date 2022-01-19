import { useEffect, useState } from "react"
import SingleForm from "./SingleForm"
import formService from '../services/formService';
import UserService from "../services/userServices";

function FormsContainer(props) {
    // getting userId as props.userId so that fetch all the forms created by the user.
    const [user, setUser]=useState({})
    const [forms,setForms]=useState([])

    // useEffect(()=>{
    //    setUser(UserService.getCurrentUser())   
    // },[])

    useEffect(()=>{
      formService.getForms(props.id).then((forms)=>setForms(forms)).catch(err=>console.log(err))
    },[props.id])
    console.log(forms,'forms')

    return (
        <div>
            {forms.length>0 && forms?.map((form)=>(
                <SingleForm formData={form} key={form._id}  />
            ))}
        </div>
    )
}

export default FormsContainer
