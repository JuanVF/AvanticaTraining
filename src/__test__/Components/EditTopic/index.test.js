import React from 'react'
import EditTopic from '../../../Components/EditTopic/'
import { render, fireEvent, cleanup } from '@testing-library/react'

afterAll(cleanup)

describe('Testing <EditTopic/>', () => {
	const props = {
		editItem: {
			name: 'node.js',
			topic_id: 1
		}
	}

	const { container } = render(<EditTopic {...props} />)

	const nameInput = container.getElementsByTagName('input')[0]

	it('will not crash on render', () => {
		expect(container.innerHTML).toMatch(/(h1)|(<form>)|input{2,2}|(button)/)
	})

	it('will execute onChange event in name input', () => {
		fireEvent.change(nameInput, {
			target: {
				value: 'PHP'
			}
		})

		expect(nameInput.value).toMatch('PHP')
	})
})
