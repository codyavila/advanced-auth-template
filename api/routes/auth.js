const express = require('express')
const router = express.Router()

const {
  register,
  login,
  forgotPassword,
  resetPassword,
  googleLogin
} = require('../controllers/auth.js')

// Different way of writing router.post('/register, <functions>)
router.route('/register').post(register)

router.route('/login').post(login)

router.route('/forgotpassword').post(forgotPassword)

router.route('/resetpassword/:resetToken').put(resetPassword)

router.route('/googleLogin').post(googleLogin)

module.exports = router
