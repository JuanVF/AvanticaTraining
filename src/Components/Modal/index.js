import React from 'react'

if(process.env.NODE_ENV !== 'test') require('./style.css')

function Modal(props) {
  let modalClass = 'alert alert-danger'

  if (props.successModal) modalClass = 'alert alert-success'

  if (props.isVisible) {
    return (
      <div className='modal_container'>
        <div className={modalClass}>
          <strong>Message: </strong>
          {props.message}
        </div>
      </div>
    )
  }

  return null
}

export default Modal
