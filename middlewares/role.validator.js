/* eslint-disable no-unused-vars */

// eslint-disable-next-line consistent-return
const isAdminRole = (req, res, next) => {
  const { user } = req
  if (!user) {
    return res.status(500).json({
      msg: 'Needs to validate token first to validate role'
    })
  }

  const { role, name } = user
  if (role !== 'ADMIN') {
    return res.status(401).json({
      msg: `${name} have not an administrator role`
    })
  }

  next()
}

const haveRole =
  (...roles) =>
  // eslint-disable-next-line consistent-return
  (req, res, next) => {
    const { user } = req
    if (!user) {
      return res.status(500).json({
        msg: 'Needs to validate token first to validate role'
      })
    }

    const { role } = user
    if (!roles.includes(role)) {
      return res.status(401).json({
        msg: `Role is not part of recommended roles: ${roles}`
      })
    }

    next()
  }

module.exports = {
  haveRole,
  isAdminRole
}
