import React from 'react'
import AddResource from '../../../Components/AddResource/'
import { render, fireEvent, cleanup } from '@testing-library/react'

afterAll(cleanup)

describe('Testing <AddResource/>', () => {
	const { container } = render(<AddResource />)
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

describe('test Add Resource functions', () => {
	const addResource = new AddResource()

	//Mock setState function
	addResource.setState = data => {
		addResource.state = {
			...addResource.state,
			...data
		}
	}

	it('can set dropdown items on state', () => {
		const dropdownItems = [
			{
				topic_id: 0,
				name: 'mock'
			}
		]

		addResource.setDropdownItems(dropdownItems)

		expect(addResource.state.resourceValue).toBe(0)
	})

	it('can change current dropdown item selected', () => {
		const item = {
			topic_id: 1,
			name: 'super_mock'
		}

		const event = {
			preventDefault: jest.fn
		}

		addResource.handleDropdown(event, item)

		expect(addResource.state.resourceValue).toBe(item.topic_id)
	})

	it('can set state on inputs onChange event', () => {
		const event = {
			target: {
				value: 'node.js',
				name: 'description'
			}
		}

		addResource.handleInputsValues(event)

		expect(addResource.state.descriptionValue).toBe('node.js')
	})

	it('will clean states values', () => {
		addResource.cleanInputsValues()

		expect(addResource.state.descriptionValue).toBe('')
	})

	it('can change modal state', ()=>{
		const msg = 'This is a test msg'

		addResource.toggleModal(msg)	
		
		expect(addResource.state.modalMessage).toBe(msg)
	})
})
