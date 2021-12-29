const express = require('express')
const cors = require('cors')
const userRoute = require('../routes/user')

const { dbConnection } = require('../database/config')

class Server {
  constructor() {
    this.app = express()
    this.port = process.env.PORT
    this.userEndpoint = '/api/users'
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
    this.app.use(this.userEndpoint, userRoute)
  }

  listen() {
    this.app.listen(this.port)
  }
}

module.exports = Server
