import React from 'react'
import { Link } from 'react-router-dom'

import './style.css'
import { SidebarMenuUnlogged } from '../SidebarMenu/';

class NavbarLogged extends React.Component {
  render() {
    return (
      <nav className='navbar navbar-light bg-light'>
        <div className='container-fluid'>
          <div className='navbar-header'>
            <Link to='/AvanticaTraining/' className='navbar-brand active'>
              Avantica Training
            </Link>
          </div>
          <ul className='d-flex justify-content-end'>
            <li className='nav-item'>
              <Link className='nav-link' to='/training/login'>
                Login
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/training/signup'>
                Sign up
              </Link>
            </li>
          </ul>
        </div>
        <SidebarMenuUnlogged handleLogout={this.handleLogout}/>
      </nav>
    )
  }
}

export default NavbarLogged
