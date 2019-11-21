import React from 'react'
import { MyResourcesUI } from '../../../Pages/MyResources/ui'
import { render, cleanup } from '@testing-library/react'
import { BrowserRouter as MockRouter } from 'react-router-dom'
import MyResources from '../../../Pages/MyResources'
afterAll(cleanup)

describe('Testing <MyResourcesUI>', () => {
	const { container } = render(
		<MockRouter>
			<MyResourcesUI />
		</MockRouter>
	)

	it('will render without crashing', () => {
		expect(container.innerHTML).toMatch(/(my_resources_container)/)
	})
})

describe('Testing MyResource functions', () => {
	const myResources = new MyResources()

	//Mocks
	myResources.setState = data => {
		myResources.state = {
			...myResources.state,
			...data
		}
	}

	it('will change selector state to add component', () => {
		myResources.closeEditComponent()

		expect(myResources.state.crudStatus).toBe('ADD')
	})

	it('will change selector state to edit component', () => {
		const event = {
			preventDefault: jest.fn
		}
		const item = {
			mock: 'is mocked'
		}

		const state = {
			crudStatus: 'EDIT',
			selectedItem: item
		}

		myResources.openEditComponent(event, item)

		const result = {
			crudStatus: myResources.state.crudStatus,
			selectedItem: myResources.state.selectedItem
		}

		expect(result).toEqual(state)
	})

	it('will receive table data from API', async ()=>{
		await myResources.getResourcesItems()

		expect(myResources.state.tableData.length).toBeGreaterThan(0)
	})
})
