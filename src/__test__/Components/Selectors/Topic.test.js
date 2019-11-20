import React from 'react'
import ResorceSelector from '../../../Components/Selectors/Resource'

import { render, cleanup } from '@testing-library/react'

afterAll(cleanup)

describe('Testing <ResourceSelector>', () => {
	const props = {
		status: 'EDIT',
		selectedItem: {
			resource_id: 1,
			description: 'Udemy Node.js Course',
			topic: 'node.js',
			url: 'https://www.udemy.com/es/topic/nodejs/'
		}
	}
	const { container, rerender } = render(<ResorceSelector {...props} />)

	it('will render Edit Resource component', () => {
		expect(container.innerHTML).toMatch(
			/(h1)|(<form>)|(label)|(Name:)|(input){2,2}|(button)|(save)/
		)
	})

	it('can render Add Resource component on props update', () => {
		props.status = 'ADD'
		rerender(<ResorceSelector {...props} />, container)
		expect(container.innerHTML).toMatch(/(button)|(input{2,2})/)
	})
})
