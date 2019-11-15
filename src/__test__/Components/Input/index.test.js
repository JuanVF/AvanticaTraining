import React from 'react'
import Input from '../../../Components/Input/'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

describe('Testing Input component props', () => {
  const handleInputs = event => {
    props.value = event.target.value
  }
  const props = {
    label: 'Name:',
    type: 'password',
    name: 'password',
    value: 'STRONG_PASSWORD',
    title: 'Please fill out this field',
    placeholder: 'Type your password here...',
    handleInputs: handleInputs
  }

  const wrapper = mount(<Input {...props} />)

  const input = wrapper.find('input').instance()
  const label = wrapper.find('label')

  test('Test label props', () => {
    expect(label.text()).toBe('Name:')
  })

  test('Test type props', () => {
    const type = input.type
    expect(type).toMatch('password')
  })

  test('Test name props', () => {
    const name = input.name

    expect(name).toMatch('password')
  })

  test('Test value props', () => {
    const value = input.value

    expect(value).toMatch('STRONG_PASSWORD')
  })

  test('Test title props', () => {
    const title = input.title

    expect(title).toMatch('Please fill out this field')
  })

  test('Test placeholder props', () => {
    const placeholder = input.placeholder

    expect(placeholder).toMatch('Type your password here...')
  })

  test('Test onChange event', () => {
    wrapper.find('input').simulate('change', {
      target: {
        value: 'STRONGER_PASSWORD_THAN_BEFORE'
      }
    })

    wrapper.update()

    expect(props.value).toBe('STRONGER_PASSWORD_THAN_BEFORE')
  })
})
