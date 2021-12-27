const express = require('express');
const cors = require('cors');
const userRoute = require('../routes/user');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.userEndpoint = '/api/users';
    // Middlewares
    this.middlewares();
    // App routes
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.userEndpoint, userRoute);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}

module.exports = Server;
