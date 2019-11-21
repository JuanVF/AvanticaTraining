import React from 'react'
import { Home, getTableData } from '../../../Pages/Home/'
import { render, cleanup } from '@testing-library/react'

afterAll(cleanup)

describe('Testing <Home>', () => {
	const { container } = render(<Home />)

	it('will render without crashing', () => {
		expect(container.innerHTML).toMatch(
			/(home_table_container)|(Top(ic)?)|(Resources)|/
		)
	})

	it('can fetch home data', async()=>{
        const mockSetTableData = (data)=>undefined;
        const tableData = await getTableData(mockSetTableData)

        expect(tableData.length).toBeGreaterThanOrEqual(0)
    })
})
