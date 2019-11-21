import React from 'react'
import Login from '../../../Pages/Login/index'
import { render, cleanup } from '@testing-library/react'
import { BrowserRouter as MockRouter } from 'react-router-dom'
import { samantha_fb_token } from '../../../Util/API/constants'
import { insert_test_users, cleanup_users } from '../../TestConstants'

beforeAll(async () => {
	await insert_test_users()
})
afterEach(() => localStorage.removeItem('login_token'))
afterAll(async ()=>{
	cleanup()
	await cleanup_users()
})
setupFBComponent()

describe('Testing <Login>', () => {
	const { container } = render(
		<MockRouter>
			<Login />
		</MockRouter>
	)

	it('will render without crashing', () => {
		expect(container.innerHTML).toMatch(/(login_container)/)
	})
})

describe('Testing Login page functions', () => {
	const loginClass = new Login()

	const mockSetState = state => {
		loginClass.state = {
			...loginClass,
			...state
		}
	}

	loginClass.setState = mockSetState

	test('login function creates token', async () => {
		loginClass.state = {
			emailValue: 'test@jhon.doe',
			passwordValue: '123456'
		}

		await loginClass.login()

		const token = localStorage.getItem('login_token')

		expect(token).toMatch(/Bearer /)
	})

	test('login function will not create tokens with bad credentials', async () => {
		loginClass.state = {
			emailValue: 'fake@gmail.com',
			passwordValue: 'fake_pass'
		}

		await loginClass.login()

		const token = localStorage.getItem('login_token')

		expect(token).toBeNull()
	})

	test('handle inputs is setting state', async () => {
		const event = {
			target: {
				value: 'PASSWORD',
				name: 'password'
			}
		}
		loginClass.state = {
			passwordTitle: 'Please fill out this field',
			passwordValue: ''
		}
		loginClass.handleInputs(event)

		expect(loginClass.state.passwordTitle).toBe('')
	})

	test('handle inputs will not change state with bad name', () => {
		const event = {
			target: {
				value: 'fake@jhon.doe',
				name: 'emai'
			}
		}

		loginClass.state = {
			emailTitle: 'Please fill out this field',
			emailValue: ''
		}

		loginClass.handleInputs(event)

		expect(loginClass.state.state.emailValue).toBe('')
	})

	test('it can login with a real FB Token', async () => {
		const fbdata = {
			accessToken: samantha_fb_token,
			email: 'samantha_ezuxmjf_castillo@tfbnw.net'
		}

		await loginClass.handleFBButton(fbdata)

		const token = localStorage.getItem('login_token')

		expect(token).toMatch(/Bearer /)
	})

	test('it can login with email-password users', async () => {
		loginClass.state = {
			passwordValue: 'testing',
			emailValue: 'jhon@doe.com'
		}

		loginClass.login = () => localStorage.setItem('login_token', 'Bearer.')

		const event = {
			preventDefault: jest.fn
		}

		await loginClass.handleLoginButton(event)

		const token = localStorage.getItem('login_token')

		expect(token).toMatch(/Bearer./)
	})

	test('will fail with empty data', async () => {
		loginClass.state = {
			passwordValue: '',
			emailValue: 'jhon@doe.com'
		}

		loginClass.login = () => localStorage.setItem('login_token', 'Bearer.')

		const event = {
			preventDefault: jest.fn
		}

		await loginClass.handleLoginButton(event)

		const token = localStorage.getItem('login_token')

		expect(token).toBeNull()
	})

	test('it can change modal state', () => {
		loginClass.toggleModal('Testing modal')

		expect(loginClass.state.modalMessage).toBe('Testing modal')
	})
})

//This is necessary to make react-facebook-login PASS the test
function setupFBComponent() {
	const fbScript = document.createElement('script')
	fbScript.id = 'facebook-jssdk'
	document.body.appendChild(fbScript)
}
