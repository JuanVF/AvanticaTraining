import React from 'react'
import Login from '../../../Pages/Login/index'
import { render, cleanup } from '@testing-library/react'
import { BrowserRouter as MockRouter } from 'react-router-dom'

afterAll(cleanup)

//This is necessary to make react-facebook-login PASS the test
const fbScript = document.createElement('script')
fbScript.id = 'facebook-jssdk'
document.body.appendChild(fbScript)

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
