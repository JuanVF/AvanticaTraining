import React from 'react'
import { Link } from 'react-router-dom'
import util from '../../Util/Util'

import Modal from '../../Components/Modal/'
import Input from '../../Components/Input/'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

import './style.css'

class SignUp extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      emailValue: '',
      passwordValue: '',
      nameValue: '',
      emailValueTitle: 'Please fill out this field',
      passwordValueTitle: 'Please fill out this field',
      nameValueTitle: 'Please fill out this field',
      isModalVisible: false,
      modalMessage: '',
      isASuccessModal: false
    }
  }

  //This function sets the state values for the inputs
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

  handleFacebookSignup = async res => {
    console.log(res)

    let data = {
      email: res.userID,
      name: res.name,
      fb_token: res.accessToken,
      password: '',
      role: 1
    }

    let status = await util.FetchSignup.signup_fb(data)

    if (status === 200) {
      this.toggleModal('User was registered!', true)
    } else if (status === 406) {
      this.toggleModal('This user is already registered')
    }
  }

  handleSignup = event => {
    event.preventDefault()

    let objectCollection = [
      this.state.emailValue,
      this.state.passwordValue,
      this.state.nameValue
    ]

    let alerts = util.Alerts

    if (
      !alerts.alertIfObjectsAreEmpty(objectCollection, this.toggleModal) &&
      alerts.alertIfIsNotAnEmail(this.state.emailValue, this.toggleModal)
    ) {
      this.signUp()
    }
  }

  signUp = async () => {
    let body = {
      email: this.state.emailValue,
      password: this.state.passwordValue,
      name: this.state.nameValue
    }

    let status = await util.FetchSignup.signup(body)

    if (status === 200) {
      this.toggleModal('User was registered!', true)
      this.cleanInputs()
    } else if (status === 406) {
      this.toggleModal('This user is already registered')
    }
  }

  toggleModal = async (message, successModal) => {
    setTimeout(() => {
      this.setState({
        isModalVisible: false,
        successModal: false
      })
    }, 3000)

    this.setState({
      isModalVisible: !this.isModalVisible,
      modalMessage: message,
      isASuccessModal: successModal
    })
  }

  cleanInputs = () => {
    this.setState({
      emailValue: '',
      passwordValue: '',
      nameValue: ''
    })
  }

  render() {
    let state = this.state

    return (
      <React.Fragment>
        <section className='sl_container'>
          <div>
            <FacebookLogin
              id='facebook_login_button'
              appId='2627135220683277'
              fields='name,email,picture'
              callback={this.handleFacebookSignup}
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

          <form>
            <p className='h5'>Sign up with your email address</p>
            <Input
              value={state.emailValue}
              handleInputs={this.handleInputs}
              name='emailValue'
              title={state.emailValueTitle}
              placeholder='Email'
            />
            <Input
              value={state.passwordValue}
              handleInputs={this.handleInputs}
              name='passwordValue'
              type='password'
              title={state.passwordValueTitle}
              placeholder='password'
            />
            <Input
              value={state.nameValue}
              handleInputs={this.handleInputs}
              name='nameValue'
              title={state.nameValueTitle}
              placeholder='Name'
            />
            <button onClick={this.handleSignup} className='btn btn-success'>
              Sign Up
            </button>
          </form>

          <p>
            Already have an account? <Link to='/training/login'>Log in</Link>
          </p>
        </section>
        <Modal
          isVisible={state.isModalVisible}
          message={state.modalMessage}
          successModal={this.state.isASuccessModal}
        />
      </React.Fragment>
    )
  }
}

export default SignUp
