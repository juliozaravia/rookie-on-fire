const { request, response } = require('express')
const bcryptjs = require('bcryptjs')

const User = require('../models/user')

const getUsers = async (req = request, res = response) => {
  // TODO: Validate that limit and from are transformable to numbers by Number foo
  const { limit = 2, from = 0 } = req.query
  const usersQuery = User.find({ status: true })
    .skip(Number(from))
    .limit(Number(limit))
  const totalQuery = User.countDocuments({ status: true })

  const [users, total] = await Promise.all([usersQuery, totalQuery])

  res.json({ total, users })
}

const createUsers = async (req, res = response) => {
  const { name, email, password, role } = req.body
  const user = new User({ name, email, password, role })

  const salt = bcryptjs.genSaltSync()
  user.password = bcryptjs.hashSync(password, salt)

  await user.save()

  return res.json({
    msg: 'create API',
    user
  })
}

const editUsers = async (req, res = response) => {
  const { id } = req.params
  const { _id, password, google, email, ...restUser } = req.body

  if (password) {
    const salt = bcryptjs.genSaltSync()
    restUser.password = bcryptjs.hashSync(password, salt)
  }

  const user = await User.findByIdAndUpdate(id, restUser, { new: true })

  res.json(user)
}

const deleteUsers = async (req, res = response) => {
  const { id } = req.params

  const user = await User.findByIdAndUpdate(id, { status: false })

  res.json(user)
}

module.exports = {
  getUsers,
  createUsers,
  editUsers,
  deleteUsers
}
