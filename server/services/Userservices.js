const UserModal=require('../db/UserModal')
const jwt = require('jsonwebtoken');

module.exports={
    loginGet : async(req,res)=>{
        try{
            const result = await UserModal.find().lean();
            console.log(result,'result');
            res.send(result);     
            
        }catch(e){
            res.send(e);
        }
    },
    login: async(req, res)=>{
        console.log(req.body)
        try{
             const result=await UserModal.findOne({email:req.body.email}).lean()
             console.log(result,'resultuser');
             if(!result){
                 const getData={
                        name:req.body.name,
                        email:req.body.email,
                        image:req.body.image
                 }
                 const newUser=new UserModal(getData)
                 newUser.save().then((docs)=>{
                        const user={
                            id:docs._id,
                            name:docs.name,
                            email:docs.email,
                            image:docs.image
                        }
                        const accessToken=jwt.sign(user,'secret',{expiresIn:'24h'})
                        console.log(accessToken)
                       console.log(user,'user')
                       res.status(200).json({user})
                 })
             }else{
                const user={
                    id:result._id,
                    name:result.name,
                    email:result.email,
                    image:result.image
                }
                console.log(user)
                const accessToken = jwt.sign(user, 'HS256', {expiresIn: '24h'});
                console.log(accessToken);
                 res.status(200).json({
                     accessToken
                 });   
                
             }
        }catch(e){
            res.send(e)
        }
    }
}

