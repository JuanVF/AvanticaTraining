import React from 'react'
import Layout from '../../../Components/Layout/'
import { render, cleanup } from '@testing-library/react'
import { BrowserRouter as MockRouter } from 'react-router-dom'

afterEach(cleanup)

describe('Testing <Layout>', () => {
	const { rerender, container, debug } = render(
		<MockRouter>
			<Layout />
		</MockRouter>
	)

	it('will not crash on render', () => {
		expect(container.innerHTML).toMatch(
			/(<.a>){1,6}|Avantica Training|Login|Sign up/
		)
	})

	it('will not crash if user loged in', () => {
		const testToken =
			'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqdWFudmZsZXRlc0BnbWFpbC5jb20iLCJleHAiOjE1NzUxMzU0NjR9.2JHGNzbqauL37EMMBoRP_YPH7ma_gzo50M9f_V5O7hdEk4B-KaN-2_4E2Kv5RPrxjjaofaILpj8rItL7MIwE7w'
		localStorage.setItem('login_token', testToken)

		rerender(
			<MockRouter>
				<Layout />
			</MockRouter>,
			container
		)

		expect(container.innerHTML).toMatch(/(Log out)/)
	})
})
