const mongoose = require('mongoose')
const logger = require("../utils/logger")
const config = require('../utils/config')

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
.then(result => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.info('error connecting to MongoDB:', error.message)
  })

const blogSchema = new mongoose.Schema({
    title: {type: String, required: true},
    author: String,
    url: {type: String, required: true},
    likes: Number,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
})


  
module.exports = mongoose.model('Blog', blogSchema)