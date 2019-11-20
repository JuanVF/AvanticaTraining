import React from 'react'
import NavbarUnlogged from '../../../Components/Navbar/NavbarUnlogged'
import { BrowserRouter as MockRouter } from 'react-router-dom'

import { render, cleanup } from '@testing-library/react'

afterAll(cleanup)

describe('Testing <NavbarUnlogged>', () => {
	const { container, debug } = render(
		<MockRouter>
			<NavbarUnlogged />
		</MockRouter>
	)

	it('will not crash during render', () => {
		expect(container.innerHTML).toMatch(/(Sign up){1,2}/)
	})
})
