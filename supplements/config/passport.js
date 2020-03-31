const passport = require("passport")
const { Strategy: LocalStrategy } = require("passport-local")
const { Strategy: BearerStrategy } = require("passport-http-bearer")
const { User } = require("../db/schema")
const { errorHandler } = require("../db/errors")
const jwt = require("jsonwebtoken")
const jwtConfig = require("../config/jwt")

passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password"
    },
    function(username, password, done) {
      User.query()
        .where("username", username)
        .first()
        // .eager("roles")
        .then(function(user) {
          if (!user) {
            return done("Unknown user")
          }
          // if (!user.active) {
          //   return done("User is inactive")
          // }
          user.verifyPassword(password, function(err, passwordCorrect) {
            if (err) {
              return done(err)
            }
            if (!passwordCorrect) {
              return done("Invalid password")
            }
            return done(null, user)
          })
        })
        .catch(function(err) {
          done(err)
        })
    }
  )
)

passport.use(
  new BearerStrategy(function(token, done) {
    var decoded
    try {
      decoded = jwt.verify(token, jwtConfig.publicKey, { algorithm: "RS256" })
    } catch (err) {
      return done("Invalid token")
    }
    const now = Math.floor(new Date() / 1000)
    const { exp } = decoded
    if (exp < now) return done("Expired token")
    const claims = decoded["https://hasura.io/jwt/claims"]
    const uid = claims["x-hasura-user-id"]
    User.query()
      .where("id", uid)
      .first()
      // .eager("roles")
      .then(function(user) {
        if (!user) {
          return done("Invalid Token")
        }
        return done(null, user)
      })
      .catch(function(err) {
        done(err)
      })
  })
)

module.exports = passport
