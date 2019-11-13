import React from "react";

import Modal from "../Modal/";

import "./style.css";

export const AddTopicUI = props => (
  <React.Fragment>
    <div className="container add_topic_container">
      <h1>Add Topic</h1>

      <form className="justify-content-start">
        <label className="font-weight-bold ">Name:</label>
        <input
          className="form-control"
          type="text"
          placeholder="Topic Name"
          title={props.nameValueTitle}
          style={props.nameValueAlert}
          value={props.nameValue}
          onChange={props.handleInputValues}
          name="name"
        />

        <button className="btn save_button" onClick={props.handleSaveButton}>
          Save
        </button>
      </form>
    </div>
    <Modal isVisible={props.isModalVisible} message={props.modalMessage} />
  </React.Fragment>
);
