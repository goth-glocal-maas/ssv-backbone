import React, { useState } from "react"
import Link from "next/link"
import cookie from "js-cookie"
import { withRouter } from "next/router"
import { logout } from "../utils/auth"

const Header = ({ toggleSideMenu, router: { pathname } }) => {
  let loggedIn = cookie.get("token")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(0)

  return (
    <header>
      <nav
        className="navbar is-fresh is-transparent no-shadow"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <Link href="/">
              <a className="navbar-item">PDMS</a>
            </Link>

            <a className="navbar-item is-hidden-desktop is-hidden-tablet">
              <div
                id="menu-icon-wrapper"
                className="menu-icon-wrapper"
                style={{ visibility: "visible" }}
              >
                <svg width="1000px" height="1000px">
                  <path
                    className="path1"
                    d="M 300 400 L 700 400 C 900 400 900 750 600 850 A 400 400 0 0 1 200 200 L 800 800"
                  ></path>
                  <path className="path2" d="M 300 500 L 700 500"></path>
                  <path
                    className="path3"
                    d="M 700 600 L 300 600 C 100 600 100 200 400 150 A 400 380 0 1 1 200 800 L 800 200"
                  ></path>
                </svg>
                <button
                  id="menu-icon-trigger"
                  className="menu-icon-trigger"
                  onClick={() => {
                    toggleSideMenu()
                  }}
                ></button>
              </div>
            </a>

            <a
              role="button"
              aria-label="menu"
              aria-expanded="false"
              data-target="navbar-menu"
              className={`navbar-burger ${
                mobileMenuOpen === true ? "is-active" : ""
              }`}
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen)
              }}
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          <div
            id="navbar-menu"
            className={`navbar-menu is-static ${
              mobileMenuOpen === true ? "is-active" : ""
            }`}
          >
            <div className="navbar-start">
              <a className="navbar-item is-hidden-mobile">
                <div
                  id="menu-icon-wrapper"
                  className="menu-icon-wrapper"
                  style={{ visibility: "visible" }}
                >
                  <svg width="1000px" height="1000px">
                    <path
                      className="path1"
                      d="M 300 400 L 700 400 C 900 400 900 750 600 850 A 400 400 0 0 1 200 200 L 800 800"
                    ></path>
                    <path className="path2" d="M 300 500 L 700 500"></path>
                    <path
                      className="path3"
                      d="M 700 600 L 300 600 C 100 600 100 200 400 150 A 400 380 0 1 1 200 800 L 800 200"
                    ></path>
                  </svg>
                  <button
                    id="menu-icon-trigger"
                    className="menu-icon-trigger"
                    onClick={() => {
                      toggleSideMenu()
                    }}
                  ></button>
                </div>
              </a>
            </div>

            {loggedIn && (
              <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link">Posts</a>

                <div className="navbar-dropdown">
                  <Link href="/post/new">
                    <a className="navbar-item">New post</a>
                  </Link>
                  <Link href="/post/manage">
                    <a className="navbar-item">Posts</a>
                  </Link>
                </div>
              </div>
            )}

            {/* {loggedIn && (
              <Link href="/profile">
                <a
                  className={`navbar-item is-secondary modal-trigger ${
                    pathname === "/profile" ? "is-active" : ""
                  }`}
                >
                  Profile
                </a>
              </Link>
            )} */}

            {!loggedIn && (
              <Link href="/login">
                <a
                  className={`navbar-item is-secondary modal-trigger ${
                    pathname === "/login" ? "is-active" : ""
                  }`}
                >
                  Login
                </a>
              </Link>
            )}

            {loggedIn && (
              <div className="navbar-item">
                <a className="navbar-item is-secondary" onClick={logout}>
                  Logout
                </a>
              </div>
            )}
          </div>
        </div>
      </nav>

      <nav
        id="navbar-clone"
        className="navbar is-fresh is-transparent"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <a className="navbar-item is-hidden-desktop is-hidden-tablet">
              <div
                id="menu-icon-wrapper"
                className="menu-icon-wrapper"
                style={{ visibility: "visible" }}
              >
                <svg width="1000px" height="1000px">
                  <path
                    className="path1"
                    d="M 300 400 L 700 400 C 900 400 900 750 600 850 A 400 400 0 0 1 200 200 L 800 800"
                  ></path>
                  <path className="path2" d="M 300 500 L 700 500"></path>
                  <path
                    className="path3"
                    d="M 700 600 L 300 600 C 100 600 100 200 400 150 A 400 380 0 1 1 200 800 L 800 200"
                  ></path>
                </svg>
                <button
                  id="menu-icon-trigger"
                  className="menu-icon-trigger"
                ></button>
              </div>
            </a>

            <a
              role="button"
              className={`navbar-burger ${
                mobileMenuOpen === true ? "is-active" : ""
              }`}
              aria-label="menu"
              aria-expanded="false"
              data-target="cloned-navbar-menu"
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen)
              }}
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          <div
            id="cloned-navbar-menu"
            className={`navbar-menu is-fixed ${
              mobileMenuOpen === true ? "is-active" : ""
            }`}
          >
            <div className="navbar-start">
              <a className="navbar-item is-hidden-mobile">
                <div
                  id="cloned-menu-icon-wrapper"
                  className="menu-icon-wrapper"
                  style={{ visibility: "visible" }}
                >
                  <svg width="1000px" height="1000px">
                    <path
                      className="path1"
                      d="M 300 400 L 700 400 C 900 400 900 750 600 850 A 400 400 0 0 1 200 200 L 800 800"
                    ></path>
                    <path className="path2" d="M 300 500 L 700 500"></path>
                    <path
                      className="path3"
                      d="M 700 600 L 300 600 C 100 600 100 200 400 150 A 400 380 0 1 1 200 800 L 800 200"
                    ></path>
                  </svg>
                  <button
                    id="cloned-menu-icon-trigger"
                    className="menu-icon-trigger"
                  ></button>
                </div>
              </a>
            </div>

            <div className="navbar-end">
              <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link">Dropdown</a>

                <div className="navbar-dropdown">
                  <a className="navbar-item">Dropdown item</a>
                  <a className="navbar-item">Dropdown item</a>
                  <a className="navbar-item">Dropdown item</a>
                </div>
              </div>
              <a
                href="#"
                className="navbar-item is-secondary modal-trigger"
                data-modal="auth-modal"
              >
                Sign in
              </a>
              <a target="_blank" href="#" className="navbar-item">
                <span className="button signup-button rounded secondary-btn raised">
                  Read More
                </span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      <style jsx>{`
        header {
          margin-bottom: -5px;
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
