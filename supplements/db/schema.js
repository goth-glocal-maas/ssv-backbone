const { promisify } = require("util")
const Knex = require("knex")
const connection = require("../knexfile")
const { Model } = require("objection")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const jwtConfig = require("../config/jwt")

const knexConnection = Knex(connection)

Model.knex(knexConnection)

class Media extends Model {
  static get tableName() {
    return "media"
  }
  static get idColumn() {
    return "id"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "user_id"],
      properties: {
        id: { type: "string" },
        user_id: { type: "string", minLength: 1, maxLength: 255 },
        name: { type: "string", minLength: 1, maxLength: 255 }
      }
    }
  }
}

class User extends Model {
  static get tableName() {
    return "user"
  }

  static get idColumn() {
    return "id"
  }

  getUser() {
    return {
      id: this.id,
      username: this.username,
      email: this.email,
      roles: this.role,
      token: this.getJwt()
    }
  }

  getHasuraClaims() {
    let allowedRoles = []
    switch (this.role) {
      case "admin":
        allowedRoles = ["admin", "officer", "user"]
        break
      case "officer":
        allowedRoles = ["officer", "user"]
        break
      case "user":
        allowedRoles = ["user"]
        break
    }
    return {
      "x-hasura-allowed-roles": allowedRoles,
      "x-hasura-default-role": this.role,
      "x-hasura-user-id": `${this.id}`
      // 'x-hasura-org-id': '123',
      // 'x-hasura-custom': 'custom-value'
    }
  }

  getJwt() {
    const signOptions = {
      subject: this.id,
      expiresIn: "30d", // 30 days validity
      algorithm: "RS256"
    }
    const claim = {
      name: this.username,
      // iat: Math.floor(Date.now() / 1000),
      "https://hasura.io/jwt/claims": this.getHasuraClaims()
    }
    return jwt.sign(claim, jwtConfig.key, signOptions)
  }

  async $beforeInsert() {
    const salt = bcrypt.genSaltSync()
    if (this.password) this.password = await bcrypt.hash(this.password, salt)
  }

  async $beforeUpdate() {
    await this.$beforeInsert()
  }

  verifyPassword(password, callback) {
    bcrypt.compare(password, this.password, callback)
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["username"],
      properties: {
        id: { type: "string" },
        username: { type: "string", minLength: 1, maxLength: 255 }
      }
    }
  }
}

module.exports = { User, Media }
