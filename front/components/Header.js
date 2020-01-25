import Link from "next/link"
import cookie from "js-cookie"
import { withRouter } from "next/router"
import { logout } from "../utils/auth"

const Header = ({ router: { pathname } }) => {
  let loggedIn = cookie.get("token")
  return (
    <header>
      <Link href="/">
        <a className={pathname === "/" ? "is-active" : ""}>Home</a>
      </Link>
      {!loggedIn && (
        <Link href="/login">
          <a className={pathname === "/login" ? "is-active" : ""}>Login</a>
        </Link>
      )}
      {loggedIn && (
        <Link href="/profile">
          <a className={pathname === "/profile" ? "is-active" : ""}>Profile</a>
        </Link>
      )}
      <Link href="/client-only">
        <a className={pathname === "/client-only" ? "is-active" : ""}>
          Client-Only
        </a>
      </Link>
      <Link href="/about">
        <a className={pathname === "/about" ? "is-active" : ""}>About</a>
      </Link>
      {loggedIn && <button onClick={logout}>Logout</button>}

      <style jsx>{`
        header {
          margin-bottom: 25px;
        }
        a {
          font-size: 14px;
          margin-right: 15px;
          text-decoration: none;
        }
        .is-active {
          text-decoration: underline;
        }
      `}</style>
    </header>
  )
}

export default withRouter(Header)
