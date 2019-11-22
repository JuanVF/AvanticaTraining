import React from 'react'
import SignUp from '../../../Pages/SignUp/index'
import { render, cleanup } from '@testing-library/react'
import { BrowserRouter as MockRouter } from 'react-router-dom'

afterAll(cleanup)

//This is necessary to make react-facebook-login PASS the test
const fbScript = document.createElement('script')
fbScript.id = 'facebook-jssdk'
document.body.appendChild(fbScript)

describe('Testing <SignUp>', () => {
	const { container } = render(
		<MockRouter>
			<SignUp />
		</MockRouter>
	)
	it('will render without crashing', () => {
		expect(container.innerHTML).toMatch(/(signup_container)/)
	})
})

describe('Testing sign up functions', () => {
	const signUp = new SignUp()

	signUp.setState = data => {
		signUp.state = {
			...signUp.state,
			...data
		}
	}

	it('will clean signup state data', () => {
		signUp.state = {
			emailValue: 'a',
			passwordValue: 'cleanup',
			nameValue: 'test'
		}

		signUp.cleanInputs()

		expect(signUp.state.emailValue).toBe('')
	})

	test('if toggle modal is working', async () => {
		const msg = 'Test is working'

		await signUp.toggleModal(msg, true)

		expect(signUp.state.modalMessage).toBe('Test is working')
	})

	test('if handle inputs is changing state', () => {
		const event = {
			target: {
				value: 'pwd is strong',
				name: 'password'
			}
		}

		signUp.handleInputs(event)

		expect(signUp.state.passwordValue).toBe('pwd is strong')
	})

	test('if handle inputs will not change state on wrong name', () => {
		const event = {
			target: {
				value: 'pwd is strong',
				name: 'pssword'
			}
		}

		signUp.state.passwordValue = ''

		signUp.handleInputs(event)

		expect(signUp.state.passwordValue).toBe('')
	})

	it('will fail a fb signup', async () => {
		const body = {
			email: 'not@facebook.account',
			fbtoken: 'FAKE_TOKEN'
		}
		signUp.toggleModal = msg => {
			signUp.state.msg = msg
		}
		await signUp.insertFBUser(body)

		expect(signUp.state.msg).toBe('This user is already registered')
	})
})
