import FontAwesome from "react-fontawesome"

const Sidebar = ({ sideMenuOpen, toggleSideMenu }) => {
  return (
    <div className={`sidebar ${sideMenuOpen === true ? "is-active" : ""}`}>
      <div className="sidebar-header">
        <a
          className={`sidebar-close `}
          onClick={() => toggleSideMenu()}
        >
          <FontAwesome
            name="close"
            className="close-btn fa-2x"
            style={{ color: "white" }}
          />
        </a>
      </div>
      <div className="inner">
        <ul className="sidebar-menu">
          <li>
            <span className="nav-section-title"></span>
          </li>
          <li className="have-children">
            <a href="#">
              <span className="fa fa-info-circle"></span>About
            </a>
            <ul>
              <li>
                <a
                  target="_blank"
                  href="https://docs.appseed.us/apps/bulma-css/bulmaplay"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  href="https://github.com/app-generator/bulmaplay"
                >
                  Sources
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  href="https://appseed.us/apps/bulma-css/bulmaplay"
                >
                  Product
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  href="https://blog.appseed.us/bulmaplay-jamstack-app-built-with-bulma-css"
                >
                  Blog
                </a>
              </li>
            </ul>
          </li>
          <li className="have-children">
            <a href="#">
              <span className="fa fa-cog"></span>Support
            </a>
            <ul>
              <li>
                <a
                  target="_blank"
                  href="https://github.com/app-generator/bulmaplay/issues/new"
                >
                  Github
                </a>
              </li>
              <li>
                <a target="_blank" href="https://discord.gg/fZC6hup">
                  Discord
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
