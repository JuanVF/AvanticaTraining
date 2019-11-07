import React from 'react'
import { Link } from 'react-router-dom'

import Modal from '../../Components/Modal/'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { SignupForm } from '../../Components/SignupForm/'

export const SignUpUI = props => (
  <React.Fragment>
    <section className='sl_container'>
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
              Sign up with Facebook
            </button>
          )}
        />
      </div>
      <SignupForm {...props} />
      <p>
        Already have an account? 
        <Link to='/training/login'> Log in</Link>
      </p>
    </section>
    <Modal
      isVisible={props.isModalVisible}
      message={props.modalMessage}
      successModal={props.isASuccessModal}
    />
  </React.Fragment>
)
