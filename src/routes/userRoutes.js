const express = require('express')
const router = express.Router();
const userController = require('../controller/userController')
const tokenAuthentication = require('../middlewares/auth.middleware')


router.post('/userSignup',userController.userSignup)
router.post('/userLogin',userController.userLogin)
router.put('/updateUser',tokenAuthentication,userController.updateUser)
router.delete('/deleteUser',tokenAuthentication,userController.deleteUser)


module.exports = router