const passport = require("../config/passport")
const { User } = require("../db/schema")
const { errorHandler } = require("../db/errors")
const rasha = require("rasha")
const jwtConfig = require("../config/jwt")
const { randomBytes } = require("crypto");
const { promisify } = require("util");
const bcrypt = require("bcryptjs");


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
        password: req.body.password
      })
  } catch (err) {
    errorHandler(err, res)
    return
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
  // 1. Check if this is a real user
  let reqUser = await User.query().where("email", req.body.email)
  if (reqUser.length === 0) {
    let msg = `No such user found for email ${args.email}`;
    return handleResponse(res, 401, { error: msg })
  }

  // 2. Set a reset token and expiry on that user
  const randomBytesPromiseified = promisify(randomBytes);
  const resetToken = (await randomBytesPromiseified(20)).toString("hex");
  const resetTokenExpiry = Date.now() + 3600000; // 1 hour from now

  const numUpdated = await User.query()
    .findById(reqUser.id)
    .patch({
      resetToken,
      resetTokenExpiry
    });

  // 3. Email them that reset token
  /* const mailRes = await transport.sendMail({
    from: 'wes@wesbos.com',
    to: user.email,
    subject: 'Your Password Reset Token',
    html: makeANiceEmail(`Your Password Reset Token is here!
    \n\n
    <a href="${process.env
      .FRONTEND_URL}/reset?resetToken=${resetToken}">Click Here to Reset</a>`),
  }); */

  // 4. Return the message
  let msg = { "success": "Please check your email for a reset password link." }
  return handleResponse(res, 200, msg)

}

exports.resetPassword = async (req, res, next) => {
  /*
    req.body.email
  */
  const { password, confirmPassword } = req.body
  // 1. check if the passwords match
  if (req.body.password !== req.body.confirmPassword) {
    let msg = `Yo Passwords don't match!`;
    return handleResponse(res, 401, { error: msg })
  }
  // 2. check if its a legit reset token
  // 3. Check if its expired


  let user = await User.query().where("resetToken", req.args.resetToken).where("resetTokenExpiry_gte", '>', Date.now() - 3600000)

  if (!user) {
    let msg = "This token is either invalid or expired!";
    return handleResponse(res, 401, { error: msg })
  }
  // 4. Hash their new password -- automatically in db.schema
  // 5. Save the new password to the user and remove old resetToken fields
  const updatedUser = await User.query()
    .findById(user.id)
    .patch({
      resetToken: null,
      resetTokenExpiry: null,
      password: password
    });
  // 6. Generate JWT
  // const token = jwt.sign({ userId: updatedUser.id }, process.env.APP_SECRET);
  // 7. Set the JWT cookie
  // ctx.response.cookie("token", token, {
  //   httpOnly: true,
  //   maxAge: 1000 * 60 * 60 * 24 * 365
  // });
  // 8. return the new user
  return handleResponse(res, 200, updatedUser.getUser());
}

function handleResponse(res, code, statusMsg) {
  res.status(code).json(statusMsg)
}
