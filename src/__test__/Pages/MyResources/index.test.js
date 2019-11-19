import React from 'react'
import MyResources from '../../../Pages/MyResources/'
import { act } from 'react-dom/test-utils'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import 'isomorphic-fetch'

Enzyme.configure({ adapter: new Adapter() })

//describe('')
