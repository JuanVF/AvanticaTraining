import React from 'react';

import util from '../../Util/Util';

import '../Styles/CRUDTopics.css';

class AddTopics extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            nameValue : "",
            nameValueTitle : "Please fill out this field",
            nameValueAlert : {
                borderLeft : '5px solid #AB4846'
            }
        };
    }

    //This function handles the topics name value
    //and sets a alert if the value is unfilled
    handleInput = (event)=>{
        event.preventDefault();

        let item = event.target;
        let compare = util.Compare;

        if(!compare.isAnEmptyString(item.value)){
            this.setState({
                [item.name] : item.value,
                [item.name+"Title"] :"",
                [item.name + "Alert"] : {
                    borderLeft : '5px solid #42A948'
                }
            });
        }else{
            this.setState({
                [item.name] : item.value,
                [item.name + "Title"] : "Please fill out this field",
                [item.name + "Alert"] : {
                    borderLeft : '5px solid #AB4846'
                }
            });
        }
    }

    //This function will alert the user to fill the inputs
    //TODO: fetch API to save the topic
    handleSaveButton = (event)=>{
        event.preventDefault();

        let nameValue = this.state.nameValue
        if(!util.Alerts.alertIfIsEmpty(nameValue)){
            document.location = "/training/topics"
        }
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