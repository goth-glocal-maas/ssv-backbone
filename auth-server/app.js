/**
 * Module dependencies.
 */
require("dotenv").config()
const express = require("express")
const bodyParser = require("body-parser")
const fileUpload = require("express-fileupload")
const chalk = require("chalk")
// const dotenv = require('dotenv');
const passport = require("passport")
const cors = require("cors")
const expressValidator = require("express-validator")

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
// dotenv.load({ path: '.env.example' });

/**
 * Controllers (route handlers).
 */
const userController = require("./controllers/user")
const uploadController = require("./controllers/upload")

const app = express()

/**
 * Express configuration.
 */
app.set("host", "0.0.0.0")
app.set("port", process.env.PORT || 8080)
app.set("json spaces", 2) // number of spaces for indentation
// enable files upload
app.use(
  fileUpload({
    createParentPath: true,
    limits: {
      fileSize: 3 * 1024 * 1024 * 1024 // 3MB max file(s) size
    }
  })
)
app.use(cors())
app.use(bodyParser.json())
app.use(expressValidator())
app.use(passport.initialize())
app.use(passport.session())

app.post("/upload", uploadController.uploadFiles)
app.post("/login", userController.postLogin)
app.post("/signup", userController.postSignup)
app.get("/webhook", userController.getWebhook)
app.get("/jwks", userController.getJwks)
/**
 * Start Express server.
 */
app.listen(app.get("port"), () => {
  console.log(
    "%s App is running at http://localhost:%d in %s mode",
    chalk.green("✓"),
    app.get("port"),
    app.get("env")
  )
})

module.exports = app
