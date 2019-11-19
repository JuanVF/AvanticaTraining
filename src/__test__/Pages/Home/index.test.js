import React from 'react'
import { Home, getTableData } from '../../../Pages/Home/'
import { act } from 'react-dom/test-utils';
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import 'isomorphic-fetch'

Enzyme.configure({ adapter: new Adapter() })

describe('Testing Home component', () => {
  const wrapper = mount(<Home />)
  let mockState
  const setStateMock = state => {
    mockState = state
  }
  const component = wrapper.find('.home_table_container')

  test('Check if component is mounted', () => {
    expect(component.exists()).toBeTruthy()
  })

  test('Check if table was loaded', () => {
    expect(component.instance().innerHTML).toMatch(/Top/)
  })

  test('Test if Home component receives API data', async () => {
    await act(async()=>{
      const tableData = await getTableData(setStateMock)
  
      expect(tableData.length).toBeGreaterThan(0)
    })
  })
})
