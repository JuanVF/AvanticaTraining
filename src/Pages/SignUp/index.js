import React from 'react'
import util from '../../Util/Util'

import { SignUpUI } from './ui'

class SignUp extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      emailTitle: 'Please fill out this field',
      passwordTitle: 'Please fill out this field',
      nameTitle: 'Please fill out this field',
      emailValue: '',
      passwordValue: '',
      nameValue: '',
      modalMessage: '',
      isModalVisible: false,
      isASuccessModal: false
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

  handleFBButton = async ({email,name,accessToken}) => {
    if(email){
      let body = {
        email: email,
        name: name,
        fbtoken: accessToken
      }
  
      await this.insertFBUser(body)
    }else{
      this.toggleModal("Your Facebook Account doesnt have an email")
    }
  }

  insertFBUser = async body => {
    let status = await util.FetchSignup.signupFB(body)

    switch (status) {
      case 200:
        this.toggleModal('User was registered!', true)
        break
      case 406:
        this.toggleModal('This user is already registered')
        break
      default:
        break
    }
  }

  handleSignup = event => {
    event.preventDefault()

    const email = this.state.emailValue
    const alert = util.Alerts
    const objectCollection = [
      this.state.passwordValue,
      email,
      this.state.nameValue
    ]

    if (alert.invalidData(objectCollection, email, this.toggleModal)) {
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

    switch (status) {
      case 200:
        this.toggleModal('User was registered!', true)
        this.cleanInputs()
        break
      case 406:
        this.toggleModal('This user is already registered')
        break
      default:
        break
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
    return (
      <SignUpUI
        {...this.state}
        handleFBButton={this.handleFBButton}
        handleSignup={this.handleSignup}
        handleInputs={this.handleInputs}
      />
    )
  }
}

export default SignUp
