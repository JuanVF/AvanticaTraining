import React from 'react'
import Modal from '../../../Components/Modal/'

import { render, cleanup } from '@testing-library/react'

afterAll(cleanup)

describe('Testing <Modal />', () => {
	const props = {
		successModal: false,
        isVisible: true,
        message : 'Fill empty inputs'
	}

	const { container, rerender } = render(<Modal {...props} />)
    let modalContainer = container.getElementsByTagName('div')[0]
	it('is visible', () => {
		expect(modalContainer.innerHTML.length).toBeGreaterThan(0)
    })
    
    it('Renders message', ()=>{
        expect(modalContainer.innerHTML).toMatch(/Fill empty inputs/)
    })

    it('can change the className', ()=>{
        props.successModal = true
        rerender(<Modal {...props}/>)
        
        const newContainer = container.getElementsByClassName('alert-success')

        expect(newContainer).not.toBeUndefined()
    })

	it('is not Visible', () => {
		props.isVisible = false
		rerender(<Modal {...props} />)
        const emptyContainer = container.getElementsByTagName('div')[0]
		expect(emptyContainer).toBeUndefined()
	})
})
