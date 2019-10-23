import React from 'react';
import { Link } from 'react-router-dom';

import util from '../Util/Util';

import './Styles/CRUDTopics.css'

class EditTopic extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            topicName: "NodeJS",
            inputAlertColor : {
                borderLeft : '5px solid #42A948'
            }
        };
    }

    //This function will handle the name value and a visual alert if the
    //value is unfilled
    handleInput = (event)=>{
        let item = event.target;

        if (!util.Compare.isAnEmptyString(item.value)) {
            this.setState({
                topicName: item.value,
                inputAlertColor : {
                    borderLeft : '5px solid #42A948'
                }
            });
        }else{
            this.setState({
                topicName: item.value,
                inputAlertColor : {
                    borderLeft : '5px solid #AB4846'
                }
            });
        }
    }

    //This function will alert the user to fill the inputs
    //TODO: Fetch API to save changes on the selected topic
    handleSaveButton = (event)=>{
        event.preventDefault();

        let topicName = this.state.topicName;

        if(!util.Alerts.alertIfIsEmpty(topicName)){
            document.location = "/training/topics";
        }
    }

    render() {
        let state = this.state;
        return (
            <section className="container crud_topic_container">
                <h1>Edit Topic</h1>

                <form className="justify-content-start">
                    <label className="font-weight-bold ">Name:</label>
                    <input 
                        className="form-control" 
                        style={state.inputAlertColor} 
                        type="text" 
                        value={state.topicName}
                        placeholder="Topic Name" 
                        onChange={this.handleInput} />

                    <button 
                        onClick={this.handleSaveButton}
                        className="btn save_button">
                        Save
                    </button>
                </form>

                <Link to="/training/topics">Back to list</Link>
            </section>
        );
    }
}

export default EditTopic;