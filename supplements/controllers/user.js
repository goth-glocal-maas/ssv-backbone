const passport = require("../config/passport")
const transport = require("../config/transport")
const { User } = require("../db/schema")
const { errorHandler } = require("../db/errors")
const rasha = require("rasha")
const jwtConfig = require("../config/jwt")
const { randomBytes } = require("crypto")
const { promisify } = require("util")

/**
 * Sends the JWT key set
 */
exports.getJwks = async (req, res, next) => {
  const jwk = {
    ...rasha.importSync({ pem: jwtConfig.publicKey }),
    alg: "RS256",
    use: "sig",
    kid: jwtConfig.publicKey
  }
  const jwks = {
    keys: [jwk]
  }
  res.setHeader("Content-Type", "application/json")
  res.send(JSON.stringify(jwks, null, 2) + "\n")
  handleResponse(res, 200, jwks)
}

/**
 * Sign in using username and password and returns JWT
 */
exports.postLogin = async (req, res, next) => {
  req.assert("username", "Username cannot be blank").notEmpty()
  req.assert("password", "Password cannot be blank").notEmpty()

  const errors = req.validationErrors()

  if (errors) {
    return res.status(400).json({ errors: errors })
  }

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return handleResponse(res, 400, { error: err })
    }
    if (user) {
      handleResponse(res, 200, user.getUser())
    }
  })(req, res, next)
}

/**
 * POST /signup
 * Create a new local account
 */
exports.postSignup = async (req, res, next) => {
  req.assert("username", "Username cannot be blank").notEmpty()
  req.assert("password", "Password must be at least 4 characters long").len(4)
  req
    .assert("confirmPassword", "Passwords do not match")
    .equals(req.body.password)

  const errors = req.validationErrors()

  if (errors) {
    return res.status(400).json({ errors: errors })
  }

  try {
    const user = await User.query()
      .allowInsert("[username, password]")
      .insert({
        username: req.body.username,
        password: req.body.password,
        role: "user"
      })
    return handleResponse(res, 200, user.getUser())
  } catch (err) {
    if (`${err.constraint}` === "user_username_key") {
      return res.status(400).json({ errors: "username is already taken" })
    } else {
      errorHandler(err, res)
    }
    return
  }
}

exports.getWebhook = async (req, res, next) => {
  passport.authenticate("bearer", (err, user, info) => {
    if (err) {
      return handleResponse(res, 401, { error: err })
    }
    if (user) {
      handleResponse(res, 200, user.getHasuraClaims())
    } else {
      handleResponse(res, 200, { "X-Hasura-Role": "anonymous" })
    }
  })(req, res, next)
}

exports.requestReset = async (req, res, next) => {
  const { email } = req.body
  // 1. Check if this is a real user
  let reqUser = await User.query().where("email", email)
  if (reqUser.length === 0) {
    let msg = `No such user found for email ${email}`
    handleResponse(res, 401, { error: msg })
    return next
  }

  // 2. Set a reset token and expiry on that user
  const randomBytesPromiseified = promisify(randomBytes)
  const resetToken = (await randomBytesPromiseified(20)).toString("hex")
  const resetTokenExpiry = Date.now() + 3600000 // 1 hour from now

  const numUpdated = await User.query()
    .findById(reqUser[0].id)
    .patch({
      reset_token: resetToken,
      reset_token_expiry: new Date(resetTokenExpiry)
    })
  if (numUpdated < 1) {
    let msg = "There is something wrong on our server."
    return handleResponse(res, 500, { error: msg })
  }

  // 3. Email them that reset token
  const resetUrl = `${process.env.FRONTEND_URL}/reset?resetToken=${resetToken}`
  const mailRes = await transport.sendMail({
    from: "sipp11@gmail.com",
    to: email,
    subject: "Your Password Reset Token",
    text: `Go to ${resetUrl} to reset your password.`,
    html: `Your Password Reset Token is here!
    \n\n
    <a href="${resetUrl}">Click Here to Reset</a>`
  })

  // 4. Return the message
  let msg = { success: "Please check your email for a reset password link." }
  return handleResponse(res, 200, msg)
}

exports.resetPassword = async (req, res, next) => {
  /*
    req.body.email
  */
  const { password, confirmPassword, resetToken } = req.body
  // 1. check if the passwords match
  if (password !== confirmPassword) {
    let msg = `Yo Passwords don't match!`
    return handleResponse(res, 401, { error: msg })
  }
  // 2. check if its a legit reset token
  // 3. Check if its expired

  let users = await User.query()
    .where("reset_token", "=", resetToken)
    .where("reset_token_expiry", ">", new Date())

  if (users.length === 0) {
    let msg = "This token is either invalid or expired!"
    return handleResponse(res, 401, { error: msg })
  }
  const user = users[0]
  // 4. Hash their new password -- automatically in db.schema
  // 5. Save the new password to the user and remove old resetToken fields
  const numUpdated = await User.query()
    .findById(user.id)
    .patch({
      reset_token: null,
      reset_token_expiry: null,
      password: password
    })

  if (numUpdated < 1) {
    let msg = "There is something wrong on our server."
    return handleResponse(res, 500, { error: msg })
  }
  // 6. return the new user
  return handleResponse(res, 200, user.getUser())
}

function handleResponse(res, code, statusMsg) {
  res.status(code).json(statusMsg)
}
