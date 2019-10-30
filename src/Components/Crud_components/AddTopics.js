import React from 'react';
import ls from 'local-storage';

import util from '../../Util/Util';

import '../Styles/CRUDTopics.css';

class AddTopics extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            nameValue : "",
            nameValueTitle : "Please fill out this field"
        };
    }

    //This function handles the topics name value
    //and sets a alert if the value is unfilled
    handleInput = (event)=>{
        event.preventDefault();

        let item = event.target;

        if(item.value !== ""){
            this.setState({
                [item.name] : item.value,
                [item.name+"Title"] :""
            });
        }else{
            this.setState({
                [item.name] : item.value,
                [item.name + "Title"] : "Please fill out this field"
            });
        }
    }

    //This function will alert the user to fill the inputs
    //Also inserts the new topic
    handleSaveButton = (event)=>{
        event.preventDefault();

        let nameValue = this.state.nameValue
        if(!util.Alerts.alertIfIsEmpty(nameValue)){
            this.addTopics();
        }
    }

    //This function fetch the API to save the new topic and also refresh
    //the table component
    addTopics = async function(){
        let access_token = ls.get('login_token');
        let topic = {
            name : this.state.nameValue
        };

        await util.FetchTopic.saveTopic(access_token,topic);
        this.props.onUpdate();
    }

    render() { 
        return (
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
                        onChange={this.handleInput}
                        name="nameValue"/>
                        
                    <button 
                        className="btn save_button"
                        onClick={this.handleSaveButton}>
                        Save
                    </button>
                </form>
            </div>
        );
    }
}
 
export default AddTopics;