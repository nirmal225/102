import './index.css'
import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'

import {MdHome} from 'react-icons/md'
import {FiLogOut} from 'react-icons/fi'
import {CgShoppingBag} from 'react-icons/cg'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="nav-container">
      <div className="nav-details-container">
        <Link to="/">
          <img
            alt="website logo"
            className="logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
          />
        </Link>
        <div className="nav-desktop">
          <ul className="links-container">
            <Link to="/" className="nav-link">
              <li className="home-link">Home</li>
            </Link>
            <Link to="/jobs" className="nav-link">
              <li className="jobs-link">Jobs</li>
            </Link>
          </ul>
          <button
            type="button"
            className="logout-button"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </div>
        <ul className="nav-mobile">
          <Link to="/">
            <li>
              <MdHome className="font" size={50} />
            </li>
          </Link>
          <Link to="/jobs">
            <li>
              <CgShoppingBag className="font" size={40} />
            </li>
          </Link>
          <li>
            <FiLogOut className="font" size={40} onClick={onClickLogout} />
          </li>
        </ul>
      </div>
    </nav>
  )
}
export default withRouter(Header)
