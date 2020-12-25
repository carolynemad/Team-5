const express = require('express')
const { verifyToken } = require('../authentication/verifyToken')
const router = express.Router()

//controllers
const {
 logIn,viewProfile,updateProfile,resetPassword, changePassword, signInToCampus , signOutFromCampus , viewMissingOrExtraHours
} = require('../controllers/account.controller')

//validations
const {
 validateLogIn,validateUpdateProfile,validateResetPassword,validateChangePassword
} = require('../middleware/validations/account.validation')

//routings
router.post('/login', validateLogIn, logIn)
router.post('/viewProfile'  , viewProfile)
router.post('/updateProfile' , validateUpdateProfile , updateProfile)
router.post('/resetPassword' , validateResetPassword , resetPassword)

router.post('/signInToCampus'  , signInToCampus)
router.post('/signOutFromCampus'  , signOutFromCampus)


router.post('/viewMissingOrExtraHours'  , viewMissingOrExtraHours)


module.exports = router
