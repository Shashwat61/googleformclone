import axios from 'axios'
import jwtDecode from 'jwt-decode';
// import jwt from 'jsonwebtoken';

const API_URL='http://localhost:8000/api/user/'

const User={
    async login(res){
        const data={
            name:res.displayName,
            email:res.email,
            image:res.photoURL
        }
    //    console.log(data) 
       try {
            const res=await axios.post(API_URL+'login',data)
           
            if(res?.data?.accessToken){
                localStorage.setItem('userTicket',JSON.stringify(res.data.accessToken))
            }
            return res.data
       } catch (error) {
           console.log(error)
       }
    },
    getCurrentUser(){
        return jwtDecode(localStorage.getItem('userTicket'))
    },
    logout() {
        localStorage.removeItem("userTicket");
      },
      isAuthenticated() {
        const token = localStorage.getItem('userTicket')
          if (token) {
            return true
          } else {
            return false
          }
      },

}
export default User