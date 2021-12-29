const User = require('../models/user')
const Role = require('../models/role')

const isValidRole = async (role = '') => {
  const roleExists = await Role.findOne({ role })
  if (!roleExists) {
    throw new Error(`The role: ${role} doesn't belogn to database`)
  }
}

const isEmailDuplicated = async (email = '') => {
  const emailExists = await User.findOne({ email })
  if (emailExists) {
    throw new Error(`The email: ${email} already exists in database`)
  }
}

const isIdAssignedToUser = async (id) => {
  const userExists = await User.findById(id)
  if (!userExists) {
    throw new Error(`The id: ${id} is not related to any user`)
  }
}

module.exports = {
  isEmailDuplicated,
  isIdAssignedToUser,
  isValidRole
}
