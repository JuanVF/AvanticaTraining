import React from 'react'
import { SidebarMenuUnlogged } from '../../../Components/SidebarMenu'
import { BrowserRouter as MockRouter } from 'react-router-dom'

import { render, cleanup } from '@testing-library/react'

afterEach(cleanup)

//TODO: Test SidebarMenuUnlogged
describe('Testing <SidebarMenuUnlogged/>', () => {
	const { container } = render(
		<MockRouter>
			<SidebarMenuUnlogged />
		</MockRouter>
	)

	const sidebarContainer = container.getElementsByClassName(
		'sidebar_menu_content'
	)[0]

	it('will not crash on render', () => {
		expect(sidebarContainer.innerHTML.length).toBeGreaterThan(0)
	})

	it('will render the elements', () => {
		expect(sidebarContainer.innerHTML).toMatch(
			/(Avantica Training| Login| Sign up)/
		)
	})
})
