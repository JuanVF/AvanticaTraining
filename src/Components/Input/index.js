import React from 'react'

function Input(props) {
  let type = 'text'

  if (props.type) type = props.type

  return (
    <div>
      <label className='font-weight-bold'>{props.label}</label>
      <input
        onChange={props.handleInputs}
        type={type}
        name={props.name}
        value={props.value}
        title={props.title}
        className='form-control'
        placeholder={props.placeholder}
      />
    </div>
  )
}

export default Input
