const router=require('express').Router()
const { createForm, getFormById, editForm, submitResponse, getResponse, getAllFormsOfUser } = require('../services/Formservices')

router.route('/getuserforms/:userId').get(getAllFormsOfUser)
router.route('/create').post(createForm)
router.route('/form/:formId').get(getFormById)
router.route('/editform').put(editForm)

router.route('/addresponse').post(submitResponse)
router.route('/getresponse/:formId').get(getResponse)
module.exports=router
