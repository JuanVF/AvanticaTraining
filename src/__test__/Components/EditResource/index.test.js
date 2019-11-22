import React from 'react'
import EditResource from '../../../Components/EditResource/'
import { render, fireEvent, cleanup } from '@testing-library/react'

afterAll(cleanup)
const props = {
	selectedItem: {
		resource_id: 1,
		description: 'Udemy Node.js Course',
		topic: 'node.js',
		url: 'https://www.udemy.com/es/topic/nodejs/'
	}
}

describe('Testing <EditResource/>', () => {
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

describe('Testing EditResources functions', () => {
	const editResource = new EditResource(props)

	//Mock setState
	editResource.setState = data => {
		editResource.state = {
			...editResource.state,
			...data
		}
	}

	it('can change dropdown item', () => {
		const event = {
			preventDefault: jest.fn
		}

		const item = {
			topic_id: 0,
			name: 'mock'
		}

		editResource.handleDropdownMenu(event, item)

		expect(editResource.state.topicIdValue).toBe(item.topic_id)
	})

	it('can change modal state', () => {
		const msg = 'test message'

		editResource.toggleModal(msg)

		expect(editResource.state.modalMessage).toBe(msg)
	})
})
