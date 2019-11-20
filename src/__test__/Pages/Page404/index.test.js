import React from 'react'
import Page404 from '../../../Pages/Page404/'
import { render, cleanup } from '@testing-library/react'
import { BrowserRouter as MockRouter } from 'react-router-dom'

afterAll(cleanup)

describe('Testing <Page404>', () => {
	const { container } = render(
		<MockRouter>
			<Page404 />
		</MockRouter>
	)

	it('will render without crashing', () => {
        expect(container.innerHTML).toMatch(/(<h2>)|(Avantica)|page_404_container/)
    })
})
