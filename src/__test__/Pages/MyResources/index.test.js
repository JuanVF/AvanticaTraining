import React from 'react'
import { MyResourcesUI } from '../../../Pages/MyResources/ui'
import { render, cleanup } from '@testing-library/react'
import { BrowserRouter as MockRouter } from 'react-router-dom'
afterAll(cleanup)

describe('Testing <MyResourcesUI>', () => {
	const { container } = render(
		<MockRouter>
			<MyResourcesUI />
		</MockRouter>
	)
	it('will render without crashing', () => {
		expect(container.innerHTML).toMatch(/(my_resources_container)/)
	})
})
