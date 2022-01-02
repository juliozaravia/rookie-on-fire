const express = require('express')
const cors = require('cors')
const authRoute = require('../routes/auth.route')
const userRoute = require('../routes/user.route')

const { dbConnection } = require('../database/config.db')

class Server {
  constructor() {
    this.app = express()
    this.port = process.env.PORT
    this.userEndpoint = '/api/users'
    this.authEndpoint = '/api/auth'
    // DB Connection
    this.constructor.connectDB()
    // Middlewares
    this.middlewares()
    // App routes
    this.routes()
  }

  static async connectDB() {
    await dbConnection()
  }

  middlewares() {
    this.app.use(cors())
    this.app.use(express.json())
    this.app.use(express.static('public'))
  }

  routes() {
    this.app.use(this.authEndpoint, authRoute)
    this.app.use(this.userEndpoint, userRoute)
  }

  listen() {
    this.app.listen(this.port)
  }
}

module.exports = Server
