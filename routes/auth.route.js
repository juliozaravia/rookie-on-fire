module.exports = {}
const { Router } = require('express')
const { check } = require('express-validator')

const { login } = require('../controllers/auth.controller')
const { fieldValidator } = require('../middlewares/field.validator')

const router = Router()

router.post(
  '/login',
  [
    check('email', 'Email is mandatory').not().isEmpty(),
    check('email', 'Invalid email structure').isEmail(),
    check('password', 'Password is mandatory').not().isEmpty(),
    fieldValidator
  ],
  login
)

module.exports = router
