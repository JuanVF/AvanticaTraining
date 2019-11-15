import React from 'react'
import Modal from '../../../Components/Modal/'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

describe('Testing Modal props', () => {
  const props = {
    message: 'Testing modal props',
    successModal: false,
    isVisible: true
  }
  const wrapper = mount(<Modal {...props} />)
  let modal = wrapper.find('.modal_container div')

  test('Test message props', () => {
    const modalContent = modal.instance().innerHTML
    expect(modalContent).toMatch(/Testing modal props/)
  })

  test('Test className by default', () => {
    const hasClass = modal.hasClass('alert-danger')

    expect(hasClass).toBeTruthy()
  })

  test('Test success className', () => {
    wrapper.setProps({ successModal: true })
    modal = wrapper.find('.modal_container div')
    const hasClass = modal.hasClass('alert-success')

    expect(hasClass).toBeTruthy()
  })

  test('Test component is null when is not visible', () => {
    wrapper.setProps({ isVisible: false })
    modal = wrapper.find('.modal_container div')

    expect(modal.exists()).toBeFalsy()
  })
})
