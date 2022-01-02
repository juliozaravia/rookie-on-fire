const jwt = require('jsonwebtoken')

const jwtGenerator = (uid = '') =>
  new Promise((resolve, reject) => {
    const payload = { uid }
    jwt.sign(
      payload,
      process.env.SECRETKEY,
      {
        expiresIn: '4h'
      },
      (err, token) => {
        if (err) {
          reject(new Error('It cannot be possible generate secure token'))
        } else {
          resolve(token)
        }
      }
    )
  })

module.exports = {
  jwtGenerator
}
