const { ObjectId } = require('mongodb')
const FormModel=require('../db/FormModel')
const UserModel=require('../db/UserModal')
const ResponseModel=require('../db/ResponseModel')
module.exports={
    getAllFormsOfUser:async (req,res)=>{
        const userId=req.params.userId
        console.log(userId,'params')
        try{
            await UserModel.findOne({_id:userId}).then(async(user)=>{
                if(user===null){
                    res.status(400).send('user not found')
                }else{
                    await FormModel.find().where('_id').in(user.createdForms).exec((err,records)=>{
                       console.log(records,'records') 
                       res.status(200).json(records)
                    })
                }
            })
        }catch(e){
            res.send(e)
        }
    },
   getFormById:async(req,res)=>{
       try{
           const formId=req.params.formId
           console.log(formId,'formId')
           await FormModel.findOne({_id:formId}).then(async(form)=>{
               if(form==null){
                   res.status(404).send('Form not found')
               }
               else{
                   console.log(form,'form')
                   res.status(200).json(form)
               }
           })
       }catch(e){
              res.send(e)
       }
   },
    

    createForm: async(req, res)=>{
        try{
            const data={createdBy:req.body.createdBy,
                        name:req.body.name,
                        description:req.body.description
            }
            // console.log(ObjectId(req.body.createdBy),'objectid')
            console.log(data,'data')
            const newForm=new FormModel(data)
            await newForm.save().then((docs)=>{
                console.log(docs,'docs')
                UserModel.updateOne(
                    {_id: data.createdBy },
                    { $push: { createdForms: docs._id}})
                    .then(()=>{
                    console.log("Form id added to user details")
                    }).catch(error => console.log("got some error",error))
                    res.status(200).json(
                        docs
                    )
                    console.log('docs',docs)
           })
        }catch(err){
            res.send(err)
        }
    },

    editForm: async(req, res)=>{
         try{
              const formId=req.body.formId
              const data={
                    name:req.body.name,
                    description:req.body.description,
                    questions:req.body.questions
              }
              console.log(data,'edited data sending to db',formId)
              FormModel.findByIdAndUpdate(formId, data, {new:true}, (err, doc)=>{
                  if(err){
                      res.status(500).send(err)
                  }
                  else{
                      console.log(doc,'doc')
                      res.status(200).json(doc)
                  }
              })
         }catch(err){
             res.send(err)
         }
    },

    submitResponse: async(req, res)=>{
        console.log(req.body)
        try{
             const data={
                 formId:req.body.formId,
                    userId:req.body.userId,
                    response:req.body.response
             }
             if(data.response.length>0){
                 const newResponse=new ResponseModel(data)
                 await newResponse.save().then((docs)=>{
                     res.status(200).json(docs)
                 })
             }else{
                    res.status(400).send('fill atleast one field ')
             }
        }catch(e){
            res.send(e)
        }
    },
    getResponse: async(req, res)=>{
        try {
            const formId = req.params.formId;
         //   console.log(formId);
            
            await ResponseModel.find({formId: formId}).then(async(responses)=>{ 
                    res.status(200).json(responses)
            })

        } catch (error) {
            res.send(error)
        }
    }


}
