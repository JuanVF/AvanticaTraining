import React from 'react';
import ls from 'local-storage';

import util from '../../Util/Util';

import '../Styles/CRUDTopics.css'

class EditTopic extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            topicName: "",
            topicNameTitle : "",
            editId : this.props.editId
        };
        this.getTopic();
    }

    //This function checks when a new prop is passed
    //and refresh the component with new data
    async componentWillReceiveProps(props){
        const {editId} = this.props;

        if(props.editId !== editId){
            await this.setState({editId : props.editId})
            this.getTopic();
        }
    }

    //This functions fetch API to get the new data
    getTopic = async ()=>{
        let access_token = ls.get("login_token");
        let data = await util.FetchTopic.getTopic(access_token,this.state.editId);

        this.setState({
            topicName : data.name
        });
    }

    //This function fetch API to update the selected data
    updateData = async ()=>{
        let access_token = ls.get("login_token");
        let body = {
            topic_id : this.state.editId,
            name : this.state.topicName
        };

        await util.FetchTopic.updateTopic(access_token,body);
    }

    //This function will handle the name value and a visual alert if the
    //value is unfilled
    handleInput = (event)=>{
        let item = event.target;

        if (!util.Compare.isAnEmptyString(item.value)) {
            this.setState({
                topicName: item.value,
                topicNameTitle : ""
            });
        }else{
            this.setState({
                topicName: item.value,
                topicNameTitle : "Please fill out this field"
            });
        }
    }

    //This function will alert the user to fill the inputs
    handleSaveButton = async (event)=>{
        event.preventDefault();

        let topicName = await this.state.topicName;

        if(!util.Alerts.alertIfIsEmpty(topicName)){
            await this.updateData();
            this.props.onEditFinish()
            this.props.onUpdate();
        }
    }

    render() {
        let state = this.state;
        return (
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
        );
    }
}

export default EditTopic;