const User = require('../models/User.js')
const ErrorResponse = require('../utils/errorResponse.js')
const sendEmail = require('../utils/sendEmail.js')

exports.register = async (req, res, next) => {
  const { username, email, password } = req.body

  try {
    const user = await User.create({
      username,
      email,
      password
    })

    sendToken(user, 201, res)
  } catch (error) {
    next(error)
  }
}

exports.login = async (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400))
  }

  try {
    const user = await User.findOne({ email }).select('+password')

    if (!user) {
      return next(new ErrorResponse('Invalid Credentials', 401))
    }

    const isMatch = await user.matchPasswords(password)

    if (!isMatch) {
      return next(new ErrorResponse('Invalid Credentials', 401))
    }
    sendToken(user, 200, res)
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}

exports.forgotPassword = async (req, res, next) => {
  const {email} = req.body

  try {
    const user = await User.findOne({email})

    if(!user) {
      return next(new ErrorResponse('Email could not be sent', 404))
    }

    const resetToken = user.getResetPasswordToken()

    await user.save()

    const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`

    const message = `
      <h1>Here is your password reset link</h1>
      <p>If this wasn't you, please ignore this like and change your password immediately</p>
      <p>Click this link to reset your password</p>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `

    try {
      await sendEmail({
        to: user.email,
        subject: 'Password Reset Request',
        text: message
      })

      res.status(200).json({ success: true, data: 'Email Sent' })
    } catch (error) {
      user.resetPasswordToken = undefined
      user.resetPasswordExpire = undefined

      await user.save()

      return next(new ErrorResponse("Email could not be sent", 500))
    }
  } catch (error) {
    next(error)
  }
}

exports.resetPassword = (req, res, next) => {
  res.send('Reset Password Route')
}

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken()
  res.status(statusCode).json({ success: true, token })
}
