import React, { useState } from "react"
import cookie from "js-cookie"
import App from "../components/App"
import ProfileEdit from "../components/ProfileEdit"
import { withAuthSync } from "../utils/auth"
// import getHost from "../utils/get-host"

const Profile = () => {
  const [editMode, setEditMode] = useState(false)
  const email = cookie.get("email")
  const roles = cookie.get("roles")
  return (
    <App>
      <h1>Hello {email}</h1>
      <span className="pull-right">
        <button onClick={() => setEditMode(true)}
          className="button is-small is-light is-info">
          Edit
        </button>
      </span>
      <ul>
        <li>Change email</li>
        <li>Change password</li>
        <li>Change roles: {roles}</li>
      </ul>
    </App>
  )
}

// Profile.getInitialProps = async ctx => {
//   const { token } = nextCookie(ctx)
// }

export default withAuthSync(Profile)
