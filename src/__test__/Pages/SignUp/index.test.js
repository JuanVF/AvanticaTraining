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
