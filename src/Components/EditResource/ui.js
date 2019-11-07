import React from 'react'

import Input from '../Input/'
import Modal from '../Modal/'

export const EditResourceUI = props => (
  <React.Fragment>
    <div className='edit_resource_container'>
      <h1>Edit Resource</h1>

      <form className='justify-content-start'>
        <Input
          name='description'
          label='Description:'
          handleInputs={props.handleInputValues}
          value={props.descriptionValue}
          title={props.descriptionTitle}
          placeholder='Description'
        />

        <Input
          name='url'
          label='URL:'
          handleInputs={props.handleInputValues}
          value={props.urlValue}
          title={props.urlTitle}
          placeholder='URL'
        />

        <div className='dropdown-edit-resource'>
          <label className='font-weight-bold'>Resource:</label>

          <div className='dropdown'>
            <button
              onClick={event => event.preventDefault()}
              className='dropbtn'
            >
              {props.dropdownValue}
            </button>

            <div className='dropdown-content overflow-auto'>
              <GenerateDropdownItems
                dropdownItems={props.dropdownItems}
                handleDropdownMenu={props.handleDropdownMenu}
              />
            </div>
          </div>
        </div>

        <button onClick={props.handleSaveButton} className='btn btn-success'>
          Save
        </button>
      </form>

      <p className='text-primary' onClick={props.closeEditComponent}>
        Back to list
      </p>
    </div>
    <Modal
      isVisible={props.isModalVisible}
      message={props.modalMessage}
    />
  </React.Fragment>
)

function GenerateDropdownItems(props) {
  let dropdownItems = props.dropdownItems

  let dropdown = dropdownItems.map((item, index) => {
    return (
      <p key={index} onClick={event => props.handleDropdownMenu(event, item)}>
        {item.topic_id} - {item.name}
      </p>
    )
  })

  return dropdown
}
