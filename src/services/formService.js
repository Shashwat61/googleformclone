import axios from 'axios'

const API_URL='http://localhost:8000/api/form/'

const formService={

    async getForms(userId){
        console.log(userId)
        try{
            const response=await axios.get(API_URL+"getuserforms/"+userId)
            return response.data
        }catch(e){
            return e
        }
    },
    async createForm(data){
        try{
            const response = await axios.post(API_URL+'create',data)
            console.log(response)
            return response.data
        }catch(err){
            console.log(err)
        }
    },

    async getForm(formId){
        try{
            const response = await axios.get(API_URL+'form/'+formId)
            
            return response.data
        }catch(err){
            console.log(err)
        }
    },
    async autoSave(data){
        try{
            const response = await axios.put(API_URL+'/editform/',data)
            console.log(response,'response')
            return response.data
        }catch(err){
            console.log(err)
        }
    },
    async submitResponse(data){
        try{
            const res=await axios.post(API_URL+'addresponse/',data)
            const newdata=res.data
            console.log(newdata)
            return newdata
        }catch(err){
            console.log(err)
        }
    },

    async getResponse(formId){
        try{
            const res=await axios.get(API_URL+'getresponse/'+formId)
            const newdata=res.data
            return newdata
        }catch(err){
            console.log(err)
        }   
    }


    
}

export default formService