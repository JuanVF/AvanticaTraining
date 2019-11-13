import React from "react";

import Modal from "../Modal/";

import "./style.css";

export const AddResourceUI = props => (
  <React.Fragment>
    <div className="add_resource_container">
      <h1>Add Resource</h1>

      <form>
        <input
          onChange={props.handleInputsValues}
          value={props.descriptionValue}
          name="description"
          type="text"
          title={props.descriptionTitle}
          className="form-control"
          placeholder="Description"
        />

        <input
          onChange={props.handleInputsValues}
          value={props.urlValue}
          name="url"
          title={props.urlTitle}
          type="text"
          className="form-control"
          placeholder="URL"
        />

        <div className="dropdown">
          <button onClick={event => event.preventDefault()} className="dropbtn">
            {props.dropdownValue}
          </button>
          <div className="dropdown-content overflow-auto">
            <GenerateDropdownItems
              dropdownItems={props.dropdownItems}
              handleDropdown={props.handleDropdown}
            />
          </div>
        </div>

        <div>
          <button onClick={props.handleSaveButton} className="btn save_button">
            Save
          </button>
        </div>
      </form>
    </div>
    <Modal isVisible={props.isModalVisible} message={props.modalMessage} />
  </React.Fragment>
);

const GenerateDropdownItems = props => {
  let dropdownItems = props.dropdownItems;

  let dropdown = dropdownItems.map((item, index) => {
    return (
      <p key={index} onClick={event => props.handleDropdown(event, item)}>
        {item.topic_id} - {item.name}
      </p>
    );
  });

  return dropdown;
};
