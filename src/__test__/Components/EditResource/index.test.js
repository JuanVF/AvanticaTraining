import React from 'react'
import EditResource from '../../../Components/EditResource/'
import { render, fireEvent, cleanup } from '@testing-library/react'

afterAll(cleanup)

describe('Testing <EditResource/>', () => {
	const props = {
		selectedItem: {
			resource_id: 1,
			description: 'Udemy Node.js Course',
			topic: 'node.js',
			url: 'https://www.udemy.com/es/topic/nodejs/'
		}
	}
	const { container } = render(<EditResource {...props} />)

	const descriptionInput = container.getElementsByTagName('input')[0]
	const urlInput = container.getElementsByTagName('input')[1]

	it('will render without crashing', () => {
		expect(container.innerHTML).toMatch(
			/(h1)|(<form>)|(label)|(Name:)|(input){2,2}|(button)|(save)/
		)
	})

	it('will execute onChange event on description input', () => {
		fireEvent.change(descriptionInput, {
			target: {
				value: 'Udemy course - Node.js'
			}
		})

		expect(descriptionInput.value).toMatch('Udemy course - Node.js')
	})

	it('will execute onChange event on url input', () => {
		fireEvent.change(urlInput, {
			target: {
				value: 'https://www.udemy.com/course/node-js-api-tutorial/'
			}
		})

		expect(urlInput.value).toMatch(
			'https://www.udemy.com/course/node-js-api-tutorial/'
		)
	})
})
