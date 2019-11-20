import React from 'react'
import TopicSelector from '../../../Components/Selectors/Topic'

import { render, cleanup } from '@testing-library/react'

afterAll(cleanup)

describe('Testing <ResourceSelector>', () => {
	const props = {
		showEditComponent: true,
		editItem: {
			topic_id: 1,
			name: 'Node.js'
		}
	}
	const { container, rerender } = render(<TopicSelector {...props} />)

	it('will render Edit topic component', () => {
		expect(container.innerHTML).toMatch(/(h1)|(<form>)|input{2,2}|(button)/)
	})

	it('can render Add topic component on props update', () => {
		props.showEditComponent = false
		rerender(<TopicSelector {...props} />, container)
		expect(container.innerHTML).toMatch(
			/(h1)|(form)|(label)|(Name:)|(input){1,1}|(button)|(save)/
		)
	})
})
