import React from 'react'

import Input from '../../Components/Input/'

export const LoginForm = props => (
	<form>
		<Input
			handleInputs={props.handleInputs}
			value={props.emailValue}
			name='email'
			title={props.emailTitle}
			placeholder='Email'
		/>
		<Input
			handleInputs={props.handleInputs}
			value={props.passwordValue}
			name='password'
			type='password'
			title={props.passwordTitle}
			placeholder='Password'
		/>
		<button onClick={props.handleLoginButton} className='btn btn-success'>
			Log in
		</button>
	</form>
)
