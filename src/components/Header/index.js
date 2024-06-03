import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'
import {FaHome, FaBriefcase} from 'react-icons/fa'

const Header = props => {
  const handleLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="header-main">
      <ul className="link-container">
        <li>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="header-logo-img"
          />
        </li>
        <li className="link-tabs">
          <Link className="link-el" to="/">
            <FaHome color="#ffffff" className="header-icons" />
            <p className="link-text">Home</p>
          </Link>
        </li>

        <li>
          <Link className="link-el" to="/jobs">
            <FaBriefcase color="#ffffff" className="header-icons" />
            <p className="link-text">Jobs</p>
          </Link>
        </li>

        <li className="logout-container">
          {' '}
          <button className="logout-btn" type="button" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Header)
