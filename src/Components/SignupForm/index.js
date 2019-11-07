import React from 'react'

import Input from '../../Components/Input/'

export const SignupForm = (props) => (
  <form>
    <p className='h5'>Sign up with your email address</p>
    <Input
      value={props.emailValue}
      handleInputs={props.handleInputs}
      name='email'
      title={props.emailTitle}
      placeholder='Email'
    />
    <Input
      value={props.passwordValue}
      handleInputs={props.handleInputs}
      name='password'
      type='password'
      title={props.passwordTitle}
      placeholder='password'
    />
    <Input
      value={props.nameValue}
      handleInputs={props.handleInputs}
      name='name'
      title={props.nameTitle}
      placeholder='Name'
    />
    <button onClick={props.handleSignup} className='btn btn-success'>
      Sign Up
    </button>
  </form>
)
