import React from 'react';
import ls from 'local-storage';

import util from '../../Util/Util';
import Modal from '../Modal';

import '../Styles/CRUDTopics.css';

class EditTopic extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            topicName: props.editItem.name,
            topicNameTitle: "",
            editId: props.editItem.topic_id,
            isModalVisible: false,
            modalMessage: ''
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.editItem.topic_id !== this.props.editItem.topic_id) {
            this.setState({
                topicName: this.props.editItem.name,
                editId: this.props.editItem.topic_id
            });
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.editItem.topic_id !== prevState.topic_id) {
            return nextProps;
        }
        return null;
    }

    updateData = async () => {
        let access_token = ls.get("login_token");
        let body = {
            topic_id: this.state.editId,
            name: this.state.topicName
        };

        await util.FetchTopic.updateTopic(access_token, body);
    }

    handleInput = (event) => {
        let item = event.target;

        if (!util.Compare.isAnEmptyString(item.value)) {
            this.setState({
                topicName: item.value,
                topicNameTitle: ""
            });
        } else {
            this.setState({
                topicName: item.value,
                topicNameTitle: "Please fill out this field"
            });
        }
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

    handleSaveButton = async (event) => {
        event.preventDefault();

        let topicName = await this.state.topicName;

        if (!util.Alerts.alertIfIsEmpty(topicName, this.toggleModal)) {
            await this.updateData();
            this.props.onEditFinish();
            this.props.onUpdate();
        }
    }

    render() {
        let state = this.state;
        return (
            <React.Fragment>
                <div className="container crud_topic_container">
                    <h1>Edit Topic</h1>

                    <form className="justify-content-start">
                        <label className="font-weight-bold ">Name:</label>
                        <input
                            className="form-control"
                            type="text"
                            title={this.state.topicNameTitle}
                            value={state.topicName}
                            placeholder="Topic Name"
                            onChange={this.handleInput} />

                        <button
                            onClick={this.handleSaveButton}
                            className="btn save_button">
                            Save
                    </button>
                    </form>
                    <p onClick={this.props.onEditFinish} className="text-primary">Add new topic</p>
                </div>
                <Modal isVisible={state.isModalVisible}
                    message={state.modalMessage} />
            </React.Fragment>

        );
    }
}

export default EditTopic;