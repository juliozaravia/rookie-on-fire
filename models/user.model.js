const { Schema, model } = require('mongoose')

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, 'The name is mandatory']
  },
  email: {
    type: String,
    required: [true, 'The email is mandatory'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'The password is mandatory']
  },
  image: {
    type: String
  },
  role: {
    type: String,
    required: true,
    role: ['ADMIN', 'USER', 'SALES']
  },
  status: {
    type: Boolean,
    default: true
  },
  google: {
    type: Boolean,
    default: false
  }
})

// eslint-disable-next-line func-names
UserSchema.methods.toJSON = function () {
  const { __v, password, ...restUser } = this.toObject()
  return restUser
}

module.exports = model('User', UserSchema)
