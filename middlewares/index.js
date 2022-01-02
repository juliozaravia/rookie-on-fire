const fieldValidator = require('./field.validator')
const roleValidator = require('./role.validator')
const jwtValidator = require('./jwt.validator')

module.exports = {
  ...fieldValidator,
  ...roleValidator,
  ...jwtValidator
}
