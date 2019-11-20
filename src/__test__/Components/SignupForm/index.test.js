import React from 'react'
import { SignupForm } from '../../../Components/SignupForm/'

import { render, cleanup, fireEvent } from '@testing-library/react'

afterAll(cleanup)

describe('Testing <SignupForm />', () => {
	const mockHandleInputs = jest.fn()
	const emailProps = {
		emailValue: 'test@jhon.doe',
		emailTitle: ''
	}
	const passwordProps = {
		passwordValue: '',
		passwordTitle: 'Please fill out the input'
	}
	const nameProps = {
		nameValue: 'Jhon Doe',
		nameTitle: 'Please fill out the input'
	}
	const { rerender, container } = render(
		<SignupForm
			{...nameProps}
			{...passwordProps}
			{...emailProps}
			handleInputs={mockHandleInputs}
		/>
    )
    
    const emailInput = container.getElementsByTagName('input')[0]
    const passwordInput = container.getElementsByTagName('input')[1]
    const nameInput = container.getElementsByTagName('input')[2]

	it('will render without crashing', () => {
		expect(container.innerHTML.length).toBeGreaterThan(0)
    })
    
    
	it('render email props', () => {
		const props = {
			emailValue: emailInput.value,
			emailTitle: emailInput.title
		}

		expect(props).toEqual(emailProps)
	})

	it('render password props', () => {
		const props = {
			passwordValue: passwordInput.value,
			passwordTitle: passwordInput.title
		}

		expect(props).toEqual(passwordProps)
    })
    
	it('render name props', () => {
		const props = {
			nameValue: nameInput.value,
			nameTitle: nameInput.title
		}

		expect(props).toEqual(nameProps)
    })
    
    
	it('can execute password onChange', () => {
		fireEvent.change(passwordInput, {
			target: {
				value: 'STRONG PASSWORD',
				title: 'NOT EMPTY'
			}
		})
		const result = `${passwordInput.title} ${passwordInput.value}`
		expect(result).toMatch(/NOT EMPTY STRONG PASSWORD/)
	})

	it('can execute email onChange', () => {
		fireEvent.change(emailInput, {
			target: {
				value: 'jhon@doe.com',
				title: 'NOT EMPTY'
			}
		})
		const result = `${emailInput.title} ${emailInput.value}`
		expect(result).toMatch(/NOT EMPTY jhon@doe.com/)
    })
    
    it('can execute email onChange', () => {
		fireEvent.change(nameInput, {
			target: {
				value: 'Not Jhon Doe',
				title: 'NOT EMPTY'
			}
		})
		const result = `${nameInput.title} ${nameInput.value}`
		expect(result).toMatch(/NOT EMPTY Not Jhon Doe/)
	})
})
