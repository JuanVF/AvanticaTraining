import React from 'react';
import { Link } from 'react-router-dom';

import util from '../Util/Util';

import './Styles/CRUDTopics.css';

class AddTopics extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            nameValue : "",
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
                [item.name + "Alert"] : {
                    borderLeft : '5px solid #42A948'
                }
            });
        }else{
            this.setState({
                [item.name] : item.value,
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
        util.Alerts.alertIfIsEmpty(nameValue);
    }

    render() { 
        return (
            <section className="container crud_topic_container">
                <h1>Add Topic</h1>

                <form className="justify-content-start">
                    <label className="font-weight-bold ">Name:</label>
                    <input 
                        className="form-control" 
                        type="text" 
                        placeholder="Topic Name"
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

                <Link to="/training/topics">Back to list</Link>
            </section>
        );
    }
}
 
export default AddTopics;