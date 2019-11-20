import React from 'react'
import NavbarLogged from '../../../Components/Navbar/NavbarLogged'
import { BrowserRouter as MockRouter } from 'react-router-dom'

import { render, cleanup } from '@testing-library/react'

afterAll(cleanup)

describe('Testing <Navbar>', () => {
	const testToken =
		'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqdWFudmZsZXRlc0BnbWFpbC5jb20iLCJleHAiOjE1NzUxMzU0NjR9.2JHGNzbqauL37EMMBoRP_YPH7ma_gzo50M9f_V5O7hdEk4B-KaN-2_4E2Kv5RPrxjjaofaILpj8rItL7MIwE7w'
	localStorage.setItem('login_token', testToken)

	const { rerender, container } = render(
		<MockRouter>
			<NavbarLogged />
		</MockRouter>
	)

	it('will not crash if user is loged in', () => {
		expect(container.innerHTML).toMatch(/(Log out)/)
	})

	it('will not crash if user token is not setup', () => {
		localStorage.removeItem('login_token')

		rerender(
			<MockRouter>
				<NavbarLogged />
			</MockRouter>,
			container
        )
        
        expect(container.innerHTML).toMatch(/(Log out)/)
	})
})
