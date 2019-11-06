import React from 'react'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { Link } from 'react-router-dom'
import ls from 'local-storage'
import util from '../../Util/Util'

import Modal from '../../Components/Modal/'
import Input from '../../Components/Input/'

import './style.css'

class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      passwordValue: '',
      emailValue: '',
      emailValueTitle: 'Please fill out this field',
      passwordValueTitle: 'Please fill out this field',
      isModalVisible: false,
      modalMessage: ''
    }
  }

  //This function handles the password and email values with states
  handleInputs = event => {
    let item = event.target

    if (item.value === '') {
      this.setState({
        [item.name]: item.value,
        [item.name + 'Title']: 'Please fill out this field'
      })
    } else {
      this.setState({
        [item.name]: item.value,
        [item.name + 'Title']: ''
      })
    }
  }

  //TODO: Implement Facebook Login
  handleFacebookLogin = async response => {
    console.log(response.accessToken)
    let data = {
      email: response.userID,
      fbtoken: response.accessToken
    }

    await util.FetchLogin.login(data)

    if (ls.get('login_token')) {
      document.location = '/'
    } else {
      this.toggleModal('An error ocurred, please verify your data')
    }
  }

  //This function will alert the user if the inputs are empty
  handleLoginButton = async event => {
    event.preventDefault()

    let objectCollection = [this.state.passwordValue, this.state.emailValue]

    let alerts = util.Alerts

    if (
      !alerts.alertIfObjectsAreEmpty(objectCollection, this.toggleModal) &&
      alerts.alertIfIsNotAnEmail(this.state.emailValue, this.toggleModal)
    ) {
      await this.login()

      if (ls.get('login_token')) {
        document.location = '/'
      } else {
        this.toggleModal('Please verify your email and password')
      }
    }
  }

  login = async () => {
    let body = {
      email: this.state.emailValue,
      password: this.state.passwordValue
    }

    await util.FetchLogin.login(body)
  }

  toggleModal = message => {
    setTimeout(() => {
      this.setState({
        isModalVisible: false
      })
    }, 5000)

    this.setState({
      isModalVisible: !this.isModalVisible,
      modalMessage: message
    })
  }

  render() {
    return (
      <React.Fragment>
        <section className='sl_container'>
          <div>
            <FacebookLogin
              id='facebook_login_button'
              appId='2627135220683277'
              fields='name,email,picture'
              callback={this.handleFacebookLogin}
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

          <form>
            <Input
              handleInputs={this.handleInputs}
              value={this.state.emailValue}
              name='emailValue'
              title={this.state.emailValueTitle}
              placeholder='Email'
            />
            <Input
              handleInputs={this.handleInputs}
              value={this.state.passwordValue}
              name='passwordValue'
              type='password'
              title={this.state.passwordValueTitle}
              placeholder='Password'
            />
            <button
              onClick={this.handleLoginButton}
              className='btn btn-success'
            >
              Log in
            </button>
          </form>

          <p>
            Don't have an account?<Link to='/training/signup'>Sign up</Link>
          </p>
        </section>
        <Modal
          isVisible={this.state.isModalVisible}
          message={this.state.modalMessage}
        />
      </React.Fragment>
    )
  }
}

export default Login
