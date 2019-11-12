import React from 'react'

import { Link } from 'react-router-dom'
import './style.css'

export const SidebarMenu = props => (
  <div className='sidebar_menu_responsive'>
    <div className='sidebar_menu_icon'>
      <div className='sidebar_menu_content'>
        <h4>Avantica Training</h4>
        <div className='line'></div>
        <Link to='/training/top' className='navbar-brand'>
          Avantica Training
        </Link>
        <Link to='/training/topics' className='navbar-brand'>
          Topics
        </Link>
        <Link to='/training/resources' className='navbar-brand'>
          Resources
        </Link>
        <p onClick={props.handleLogout} className='navbar-brand'>
          Log out
        </p>
      </div>
    </div>
    <p>Avantica Training</p>
  </div>
)

export const SidebarMenuUnlogged = () => (
  <div className='sidebar_menu_responsive'>
    <div className='sidebar_menu_icon'>
      <div className='sidebar_menu_content'>
        <h4>Avantica Training</h4>
        <div className='line'></div>
        <Link to='/training/top' className='navbar-brand'>
          Avantica Training
        </Link>
        <Link to='/training/login' className='navbar-brand'>
          Login
        </Link>
        <Link to='/training/signup' className='navbar-brand'>
          Sign up
        </Link>
      </div>
    </div>
    <p>Avantica Training</p>
  </div>
)
