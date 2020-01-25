import Link from "next/link"
import { withRouter } from "next/router"

const Footer = ({ router: { pathname } }) => (
  <footer className="footer footer-dark">
    <div className="container">
      <div className="columns">
        <div className="column"></div>
        <div className="column">
          <div className="footer-column"></div>
        </div>
        <div className="column">
          <div className="footer-column"></div>
        </div>
        <div className="column"></div>
        <div className="column">
          <div className="footer-column">
            <div className="footer-header">
              <ul className="link-list">
                <li>
                  <Link href="/about">About</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
)

export default withRouter(Footer)
