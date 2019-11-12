import React from 'react'
import ls from 'local-storage'
import util from '../../Util/Util'

import { LoginUI } from './ui'

class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      passwordTitle: 'Please fill out this field',
      emailTitle: 'Please fill out this field',
      emailValue: '',
      passwordValue: '',
      modalMessage: '',
      isModalVisible: false
    }
  }

  handleInputs = event => {
    let component = event.target
    let itemValues = {
      [component.name + 'Value']: component.value,
      [component.name + 'Title']: 'Please fill out this field'
    }

    if (component.value) itemValues[component.name + 'Title'] = ''

    this.setState(itemValues)
  }

  handleFBButton = async ({email,accessToken}) => {
    const body = {
      email: email,
      fbtoken: accessToken
    }

    await util.FetchLogin.fbLogin(body)

    if (ls.get('login_token')) {
      document.location = '/'
    } else {
      this.toggleModal('You should signup first')
    }
  }

  handleLoginButton = async event => {
    event.preventDefault()

    const email = this.state.emailValue
    const alert = util.Alerts
    const objectCollection = [this.state.passwordValue, email]

    if (!alert.invalidData(objectCollection, email, this.toggleModal)) return

    await this.login()

    if (ls.get('login_token')) {
      document.location = '/'
    } else {
      this.toggleModal('Please verify your email and password')
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
      <LoginUI
        {...this.state}
        handleFBButton={this.handleFBButton}
        handleInputs={this.handleInputs}
        handleLoginButton={this.handleLoginButton}
      />
    )
  }
}

export default Login
