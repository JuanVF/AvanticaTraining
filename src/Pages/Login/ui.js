import React from 'react'
import { Link } from 'react-router-dom'

import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import Modal from '../../Components/Modal/'
import { LoginForm } from '../../Components/LoginForm'

import './style.css'

export const LoginUI = props => (
  <React.Fragment>
    <section className='login_container'>
      <div>
        <FacebookLogin
          id='facebook_login_button'
          appId='2627135220683277'
          fields='name,email,picture'
          callback={props.handleFBButton}
          render={renderProps => (
            <button
              className='btn btn-lg btn-block facebook_login_button'
              onClick={renderProps.onClick}
            >
              Login with Facebook
            </button>
          )}
        />
      </div>

      <LoginForm {...props} />

      <p>
        Don't have an account?<Link to='/training/signup'>Sign up</Link>
      </p>
    </section>
    <Modal isVisible={props.isModalVisible} message={props.modalMessage} />
  </React.Fragment>
)
