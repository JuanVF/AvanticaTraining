import React from 'react';
import { Link } from 'react-router-dom';

import util from '../Util/Util';

import './Styles/CRUDTopics.css';
import './Styles/AddResource.css';

class AddResource extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            resourceValue: "Spring Boot",
            descriptionValue : "",
            urlValue : "",
            descriptionValueAlert : {
                borderLeft : '5px solid #AB4846'
            },
            urlValueAlert : {
                borderLeft : '5px solid #AB4846'
            }
        };
    }

    //This function sets the resource value and the dropdown box texts
    handleDropdown = (event)=>{
        event.preventDefault();

        let value = event.target.innerHTML;

        this.setState({
            resourceValue : value
        })
    }

    //This function handle the inputs value and set a warning if the value is empty
    handleInputs = (event)=>{
        event.preventDefault();

        let value = event.target.value;
        let compare = util.Compare;
        
        if(!compare.isAnEmptyString(value)){
            this.setState({
                [event.target.name] : event.target.value,
                [event.target.name + "Alert"] : {
                    borderLeft : '5px solid #42A948'
                }
            });
        }else{
            this.setState({
                [event.target.name] : event.target.value,
                [event.target.name + "Alert"] : {
                    borderLeft : '5px solid #AB4846'
                }
            });
        }
    }

    //This function alerts the user to fill out the red inputs if they are empty
    //TODO: Handle the fetch to save the new resource
    handleSaveButton = (event)=>{
        event.preventDefault();

        let objectCollection = [
            this.state.resourceValue,
            this.state.descriptionValue,
            this.state.urlValue
        ];

        util.Alerts.alertIfObjectsAreEmpty(objectCollection);
    }

    render() {
        let state = this.state;

        return (
            <section className="container crud_topic_container">
                <h1>Add Resource</h1>

                <form>
                    <input 
                        onChange={this.handleInputs} 
                        value={state.descriptionValue} 
                        name="descriptionValue" 
                        type="text" 
                        style={this.state.descriptionValueAlert}
                        className="form-control" 
                        placeholder="Description" />

                    <input 
                        onChange={this.handleInputs}
                        value={state.urlValue} 
                        name="urlValue" 
                        style={this.state.urlValueAlert}
                        type="text" 
                        className="form-control" 
                        placeholder="URL" />

                    <div className="dropdown">
                        <button className="dropbtn">{state.resourceValue}</button>
                        <div className="dropdown-content">
                            <a onClick={this.handleDropdown} href="#">NodeJS</a>
                            <a onClick={this.handleDropdown} href="#">Spring boot</a>
                            <a onClick={this.handleDropdown} href="#">Another test</a>
                        </div>
                    </div>

                    <div>
                        <button 
                            onClick={this.handleSaveButton}
                            className="btn save_button">
                            Save
                        </button>
                        <Link to="/training/resources">Back to list</Link>
                    </div>
                </form>
            </section>

        );
    }
}

export default AddResource;