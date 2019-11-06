import React from 'react'
import { Link } from 'react-router-dom'

import './style.css'

class NavbarLogged extends React.Component {
  render() {
    return (
      <nav className='navbar navbar-light bg-light'>
        <div className='container-fluid'>
          <div className='navbar-header'>
            <Link to='/training/top' className='navbar-brand active'>
              Avantica Training
            </Link>
          </div>
          <ul className='d-flex justify-content-end'>
            <li className='nav-item'>
              <Link className='nav-link' to='/training/login'>
                Log in
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/training/signup'>
                Sign up
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default NavbarLogged
