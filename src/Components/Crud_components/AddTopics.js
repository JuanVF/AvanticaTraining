import React from 'react';
import ls from 'local-storage';

import util from '../../Util/Util';
import Modal from '../Modal';

import '../Styles/CRUDTopics.css';

class AddTopics extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            nameValue: "",
            nameValueTitle: "Please fill out this field",
            isModalVisible: false,
            modalMessage: ''
        };
    }

    handleInputValues = (event) => {
        event.preventDefault();

        let item = event.target;

        if (item.value !== "") {
            this.setState({
                [item.name]: item.value,
                [item.name + "Title"]: ""
            });
        } else {
            this.setState({
                [item.name]: item.value,
                [item.name + "Title"]: "Please fill out this field"
            });
        }
    }

    handleSaveButton = (event) => {
        event.preventDefault();

        let nameValue = this.state.nameValue
        if (!util.Alerts.alertIfIsEmpty(nameValue, this.toggleModal)) {
            this.addTopics();
        }
    }

    addTopics = async function () {
        let access_token = ls.get('login_token');
        let topic = {
            name: this.state.nameValue
        };

        await util.FetchTopic.saveTopic(access_token, topic);
        this.cleanInputs();
        this.props.onUpdate();
    }

    cleanInputs = () => {
        this.setState({
            nameValue: ""
        })
    }

    toggleModal = (message) => {
        setTimeout(() => {
            this.setState({
                isModalVisible: false
            });
        }, 4000);

        this.setState({
            isModalVisible: !this.isModalVisible,
            modalMessage: message
        });
    }

    render() {
        return (
            <React.Fragment>
                <div className="container crud_topic_container">
                    <h1>Add Topic</h1>

                    <form className="justify-content-start">
                        <label className="font-weight-bold ">Name:</label>
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Topic Name"
                            title={this.state.nameValueTitle}
                            style={this.state.nameValueAlert}
                            value={this.state.nameValue}
                            onChange={this.handleInputValues}
                            name="nameValue" />

                        <button
                            className="btn save_button"
                            onClick={this.handleSaveButton}>
                            Save
                    </button>
                    </form>
                </div>
                <Modal isVisible={this.state.isModalVisible}
                    message={this.state.modalMessage} />
            </React.Fragment>

        );
    }
}

export default AddTopics;