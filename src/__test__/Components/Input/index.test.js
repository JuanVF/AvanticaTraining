import React from 'react'
import Input from '../../../Components/Input/'

import { render, cleanup, fireEvent } from '@testing-library/react'

afterAll(cleanup)

describe('Testing <Input/>', () => {
	const mockHandleInputs = jest.fn()
	const props = {
		title: 'Please fill out the empty fields',
		name: 'Password',
		value: 'STRONG_PASSWORD',
		placeholder: 'Type your password...',
		label: 'Password:',
		handleInputs: mockHandleInputs
	}
	const { container } = render(<Input {...props} />)
	const input = container.getElementsByTagName('input')[0]

	it('renders title props correctly', () => {
		expect(input.title).toMatch('Please fill out the empty fields')
	})

	it('renders name props correctly', () => {
		expect(input.name).toMatch('Password')
	})
	it('renders value props correctly', () => {
		expect(input.value).toMatch('STRONG_PASSWORD')
	})
	it('renders placeholder props correctly', () => {
		expect(input.placeholder).toMatch('Type your password')
	})

	it('execute onChange event', () => {
		fireEvent.change(input, {
			target: {
				value: 'WEAK_PASSWORD'
			}
		})

		expect(input.value).toMatch('WEAK_PASSWORD')
	})
})
