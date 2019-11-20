import React from 'react'
import { LoginForm } from '../../../Components/LoginForm/'

import { render, cleanup, fireEvent } from '@testing-library/react'

afterAll(cleanup)

describe('Testing <LoginForm />', () => {
	const mockHandleChange = jest.fn()

	const emailProps = {
		emailValue: 'test@jhon.doe',
		emailTitle: ''
	}
	const passwordProps = {
		passwordValue: '',
		passwordTitle: 'Please fill out the input'
	}

	const { container } = render(
		<LoginForm
			{...emailProps}
			{...passwordProps}
			handleInputs={mockHandleChange}
		/>
	)

	const emailInput = container.getElementsByTagName('input')[0]
	const passwordInput = container.getElementsByTagName('input')[1]

	it('will not crash on render', () => {
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
})
