import React from 'react'
import { ResourceError } from '../../../Components/ResourceError/'
import { BrowserRouter as MockRouter } from 'react-router-dom'

import { render, cleanup } from '@testing-library/react'

afterAll(cleanup)

describe('Testing <ResourceError>', () => {
	const { container, debug } = render(
		<MockRouter>
			<ResourceError />
		</MockRouter>
	)

	it('will not crash during render', () => {

		expect(container.innerHTML).toMatch(/(<h1>)|(<h2>)|(<.a>)/)
	})
})
