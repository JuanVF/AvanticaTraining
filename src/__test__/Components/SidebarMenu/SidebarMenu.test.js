import React from 'react'
import { SidebarMenu } from '../../../Components/SidebarMenu'
import { BrowserRouter as MockRouter } from 'react-router-dom'

import { render, cleanup } from '@testing-library/react'

afterEach(cleanup)

describe('Testing <SidebarMenu />', () => {
	const { container } = render(
		<MockRouter>
			<SidebarMenu />
		</MockRouter>
	)

	const sidebarContainer = container.getElementsByClassName(
		'sidebar_menu_content'
	)[0]

	it('will not crash on render', () => {
		expect(sidebarContainer.innerHTML.length).toBeGreaterThan(0)
	})

	it('will render data', () => {
		expect(sidebarContainer.innerHTML).toMatch(
			/(Avantica Training|Topics|Resources|Log out)/
		)
	})
})
