const mongoose = require('mongoose')

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN)
  } catch (error) {
    throw new Error('Error starting Database')
  }
}

module.exports = {
  dbConnection
}
