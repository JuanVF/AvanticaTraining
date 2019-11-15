import React from 'react'
import { SignupForm } from '../../../Components/SignupForm/'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

describe('Test signup form component', () => {
  const titles = 'Fill out this field'
  const emailProps = {
    emailValue: 'jhon@doe.test',
    emailTitle: titles
  }

  const passwordProps = {
    passwordValue: 'STRONG_PASSWORD',
    passwordTitle: titles
  }

  const nameProps = {
    nameValue: 'Jhon Doe',
    nameTitle: titles
  }

  const handleInputs = event => {
    props.emailValue = event.target.value
  }

  const props = {
    handleInputs: handleInputs,
    ...emailProps,
    ...passwordProps,
    ...nameProps
  }

  const wrapper = mount(<SignupForm {...props} />)

  test('Test email props', () => {
    const { value, title } = wrapper.find('input').get(0).props

    const inputProps = {
      emailValue: value,
      emailTitle: title
    }

    expect(inputProps).toEqual(emailProps)
  })

  test('Test password props', () => {
    const { value, title } = wrapper.find('input').get(1).props

    const inputProps = {
      passwordValue: value,
      passwordTitle: title
    }

    expect(inputProps).toEqual(passwordProps)
  })

  test('Test name props', () => {
    const { value, title } = wrapper.find('input').get(2).props

    const inputProps = {
      nameValue: value,
      nameTitle: title
    }

    expect(inputProps).toEqual(nameProps)
  })

  test('Test onChange event', () => {
    wrapper
      .find('input')
      .at(0)
      .simulate('change', {
        target: {
          value: 'jhon@doe.com'
        }
      })

    wrapper.update()

    expect(props.emailValue).toBe('jhon@doe.com')
  })
})
