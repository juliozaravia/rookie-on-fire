const { OAuth2Client } = require('google-auth-library')

const client = new OAuth2Client(process.env.GOOGLE_CLIENTE_ID)
async function googleVerifier(token = '') {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENTE_ID
    // Specify the CLIENT_ID of the app that accesses the backend
    // Or, if multiple clients access the backend:
    // [CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  })
  const { name, picture, email } = ticket.getPayload()

  return {
    name,
    image: picture,
    email
  }
}

module.exports = {
  googleVerifier
}
