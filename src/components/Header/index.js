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
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="header-logo-img"
        />
      </div>
      <div className="link-container">
        <Link className="link-el" to="/">
          <FaHome color="#ffffff" className="header-icons" />
          <p className="link-text">Home</p>
        </Link>
        <Link className="link-el" to="/jobs">
          <FaBriefcase color="#ffffff" className="header-icons" />
          <p className="link-text">Jobs</p>
        </Link>
      </div>

      <button className="logout-btn" type="button" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Header)
