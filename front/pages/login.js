import React, { useState } from "react"
import App from "../components/App"
import InfoBox from "../components/InfoBox"
import Header from "../components/Header"
import { withApollo } from "../lib/apollo"
import fetch from "isomorphic-unfetch"
import { login } from "../utils/auth"

const LoginPage = props => {
  const [userData, setUserData] = useState({ username: "", error: "" })

  const handleSubmit = async event => {
    event.preventDefault()
    setUserData(Object.assign({}, userData, { error: "" }))

    const username = userData.username
    const url = "/api/login"

    try {
      const response = await fetch(url, {
        method: "POST",

        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username })
      })
      if (response.status === 200) {
        const { token } = await response.json()
        await login({ token })
      } else {
        console.log("Login failed.")
        // https://github.com/developit/unfetch#caveats
        let error = new Error(response.statusText)
        error.response = response
        throw error
      }
    } catch (error) {
      console.error(
        "You have an error in your code or there are Network issues.",
        error
      )

      const { response } = error
      setUserData(
        Object.assign({}, userData, {
          error: response ? response.statusText : error.message
        })
      )
    }
  }

  return (
    <App>
      <Header />
      <InfoBox>in favour of full Server-Side-Rendering.</InfoBox>

      <div className="login">
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            value={userData.email}
            onChange={event =>
              setUserData(
                Object.assign({}, userData, { email: event.target.value })
              )
            }
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={userData.password}
            onChange={event =>
              setUserData(
                Object.assign({}, userData, { password: event.target.value })
              )
            }
          />

          <button type="submit">Login</button>

          {userData.error && <p className="error">Error: {userData.error}</p>}
        </form>
      </div>
    </App>
  )
}

export default withApollo(LoginPage)
