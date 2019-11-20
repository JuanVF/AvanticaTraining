import React from 'react'
import AddResource from '../../../Components/AddResource/'
import { render, fireEvent, cleanup } from '@testing-library/react'

afterAll(cleanup)

describe('Testing <AddResource/>', () => {
	const { container, debug } = render(<AddResource />)
	const descriptionInput = container.getElementsByTagName('input')[0]
	const urlInput = container.getElementsByTagName('input')[1]

	it('will render without crashing', () => {
		expect(container.innerHTML).toMatch(/(button)|(input{2,2})/)
	})

	it('can execute onChange event on description input', () => {
		fireEvent.change(descriptionInput, {
			target: {
				value: 'node.js documentation'
			}
		})

		expect(descriptionInput.value).toMatch('node.js documentation')
	})

	it('can execute onChange event on url input', () => {
		fireEvent.change(urlInput, {
			target: {
				value: 'https://nodejs.org/es/'
			}
		})

		expect(urlInput.value).toMatch('https://nodejs.org/es/')
	})
})
