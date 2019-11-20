import React from 'react'
import { TopicsUI } from '../../../Pages/Topics/ui'
import { render, cleanup } from '@testing-library/react'
import { BrowserRouter as MockRouter } from 'react-router-dom'
afterAll(cleanup)

describe('Testing <TopicsUI>', () => {
	const { container } = render(
		<MockRouter>
			<TopicsUI />
		</MockRouter>
	)
	it('will render without crashing', () => {
		expect(container.innerHTML).toMatch(/(topics_container)/)
	})
})
