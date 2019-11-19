import React from 'react'
import ls from 'local-storage'

import { Link } from 'react-router-dom'
import { SidebarMenu } from '../SidebarMenu/'
import './style.css'

class NavbarLogged extends React.Component {
  handleLogout = event => {
    ls.remove('login_token')
    document.location = '/AvanticaTraining'
  }
  render() {
    return (
      <nav className='navbar navbar-light bg-light'>
        <div className='container-fluid'>
          <div className='navbar-header'>
            <Link to='/AvanticaTraining/' className='navbar-brand'>
              Avantica Training
            </Link>
            <Link to='/training/topics' className='navbar-brand active'>
              Topics
            </Link>
            <Link to='/training/resources' className='navbar-brand'>
              Resources
            </Link>
          </div>
          <ul className='d-flex justify-content-end'>
            <li className='nav-item'>
              <button onClick={this.handleLogout} className='nav-link'>
                Log out
              </button>
            </li>
          </ul>
        </div>
        <SidebarMenu handleLogout={this.handleLogout} />
      </nav>
    )
  }
}

export default NavbarLogged
