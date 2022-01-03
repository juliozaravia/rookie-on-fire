const { response } = require('express')
const bcrypt = require('bcryptjs/dist/bcrypt')

const { googleVerifier } = require('../helpers/google.helpers')
const { jwtGenerator } = require('../helpers/jwt.helpers')
const User = require('../models/user.model')

const login = async (req, res = response) => {
  const { email, password } = req.body

  try {
    // Verify if email exists
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({
        msg: 'Incorrect User / Password'
      })
    }
    // Verify if user is active
    if (!user.status) {
      return res.status(400).json({
        msg: 'User has been lost his permissions'
      })
    }
    // Verify if password is correct
    const isValidPassword = bcrypt.compareSync(password, user.password)
    if (!isValidPassword) {
      return res.status(400).json({
        msg: 'Incorrect User / Password'
      })
    }
    // Generate JWT
    const token = await jwtGenerator(user.id)

    return res.json({
      user,
      token
    })
  } catch (error) {
    return res.status(500).json({
      msg: 'Error: Write / Call your SysAdmin'
    })
  }
}

const google = async (req, res = response) => {
  const { id_token: idToken } = req.body

  try {
    const { email, name, image } = await googleVerifier(idToken)
    let user = await User.findOne({ email })
    // If user doesn't exist in database
    if (!user) {
      const data = {
        name,
        email,
        password: 'dummy password',
        image,
        google: true,
        role: 'USER'
      }
      user = new User(data)
      await user.save()
    }
    // If user already exists in database and is deactivated
    if (!user.status) {
      return res.status(401).json({
        msg: 'Error: Blocked user. Contact your SysAdmin'
      })
    }
    // Generate JWT
    const token = await jwtGenerator(user.id)

    return res.json({
      token,
      user
    })
  } catch (error) {
    return res.status(500).json({
      msg: 'Error: Google Sign In failed. Contact your SysAdmin'
    })
  }
}

module.exports = {
  login,
  google
}
