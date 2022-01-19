const router=require('express').Router()
const FormRouter=require('./Formrouter')
const UserRouter=require('./UserRouter')

router.use('/user', UserRouter)
router.use('/form', FormRouter)

router.get('/',(req, res)=>{
    console.log('router working')
})

module.exports=router