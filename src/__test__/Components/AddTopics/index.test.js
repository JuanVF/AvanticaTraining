import React from 'react'
import AddTopics from '../../../Components/AddTopics/'
import { render, fireEvent, cleanup } from '@testing-library/react'

afterAll(cleanup)

describe('Testing <AddTopics/>', () => {
	const { container } = render(<AddTopics />)
	const nameInput = container.getElementsByTagName('input')[0]

	it('will render without crashing', () => {
		expect(container.innerHTML).toMatch(
			/(h1)|(form)|(label)|(Name:)|(input){1,1}|(button)|(save)/
		)
	})

	it('will execute onChange event on name input', () => {
		fireEvent.change(nameInput, {
			target: {
				value: 'Node.js'
			}
		})

		expect(nameInput.value).toMatch('Node.js')
	})
})

describe('test AddTopics functions', () => {
	const addTopics = new AddTopics()

	//Mock setState
	addTopics.setState = data => {
		addTopics.state = {
			...addTopics.state,
			...data
		}
	}

	it('will clean state values', () => {
		addTopics.cleanInputs()

		expect(addTopics.state.nameValue).toBe('')
	})

	it('will change modal state', () => {
		const msg = 'test msg'

		addTopics.toggleModal(msg)

		expect(addTopics.state.modalMessage).toBe(msg)
	})
})
