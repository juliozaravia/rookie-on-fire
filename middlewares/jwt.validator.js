const jwt = require('jsonwebtoken')

const User = require('../models/user.model')

// eslint-disable-next-line consistent-return
const jwtValidator = async (req, res, next) => {
  const token = req.header('x-token')

  if (!token) {
    return res.status(401).json({
      msg: "Request doesn't have a token"
    })
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETKEY)
    const user = await User.findById(uid)
    // Verify if user has status: true
    if (!user.status) {
      return res.status(401).json({
        msg: 'Invalid token - Token assigned to already deleted user'
      })
    }
    req.user = user

    next()
  } catch (error) {
    return res.status(401).json({
      msg: 'Invalid token'
    })
  }
}

module.exports = {
  jwtValidator
}
