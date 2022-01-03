module.exports = {}
const { Router } = require('express')
const { check } = require('express-validator')

const { login, google } = require('../controllers/auth.controller')
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

router.post(
  '/google',
  [check('id_token', 'ID_TOKEN is mandatory').not().isEmpty(), fieldValidator],
  google
)

module.exports = router
