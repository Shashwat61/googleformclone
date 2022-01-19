const router=require('express').Router()
const {login, loginGet} = require('../services/Userservices')


router.route('/login').get(loginGet).post(login)

// router.get('/login',(req, res)=>{
//     console.log('router working')
//     res.send('hi')
// })

module.exports=router
