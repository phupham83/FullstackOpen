const express = require('express')
require("express-async-errors")
const app = express()
const cors = require('cors')
const logger = require("./utils/logger")
const config = require('./utils/config')
const blogRouter = require("./controllers/blogs")
const middleware = require('./utils/middleware')
const usersRouter = require('./controllers/users')
const loginRouter = require("./controllers/login")

logger.info('connecting to', config.MONGODB_URI)
app.use(cors())
app.use(express.json())
app.use("/api/blogs", blogRouter)
app.use('/api/users', usersRouter)
app.use("/api/login", loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)
module.exports = app