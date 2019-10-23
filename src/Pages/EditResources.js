import React from 'react';
import { Link } from 'react-router-dom';

import util from '../Util/Util';

import './Styles/EditResources.css';
import './Styles/AddResource.css';

class EditResources extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            descriptionValue : "",
            urlValue : "",
            descriptionValueTitle : "",
            urlValueTitle : "",
            descriptionValueAlert : {
                borderLeft : '5px solid #42A948'
            },
            urlValueAlert : {
                borderLeft : '5px solid #42A948'
            },
            resourceValue : "NodeJS"
        };
    }

    //TODO: Fetch API to get the values of the selected item
    componentDidMount(){

    }

    //This function allows the user to change the dropdown menu item selected
    handleDropdownMenu = (event)=>{
        event.preventDefault();
        
        let item = event.target;

        this.setState({
            resourceValue : item.innerHTML
        });
    }

    //This functions sets the value in state and makes an alert if the inputs is empty
    handleInputs = (event)=>{
        let item = event.target;

        if(!util.Compare.isAnEmptyString(item.value)){
            this.setState({
                [item.name] : item.value,
                [item.name+"Title"] : "",
                [item.name + "Alert"] : {
                    borderLeft : '5px solid #42A948'
                }
            });
        }else{
            this.setState({
                [item.name] : item.value,
                [item.name+"Title"] : "Please fill out this field",
                [item.name + "Alert"] : {
                    borderLeft : '5px solid #AB4846'
                }
            });
        }
        
    }

    //This function will alert the user if the form has empty inputs
    //TODO: Fetch API to save edits
    handleSaveButton = (event)=>{
        event.preventDefault();

        let objectCollection = [
            this.state.urlValue,
            this.state.descriptionValue
        ];
        
        if(!util.Alerts.alertIfObjectsAreEmpty(objectCollection)){
            document.location = "/training/resources"
        }
    }

    render() {
        let state = this.state;

        return (
            <section className="container edit_resource_container">
                <h1>Edit Resource</h1>

                <form className="justify-content-start">
                    <div>
                        <label className="font-weight-bold">Description:</label>
                        <input
                            onChange={this.handleInputs}
                            type="text"
                            name="descriptionValue"
                            style={state.descriptionValueAlert}
                            value={state.descriptionValue}
                            title={state.descriptionValueTitle}
                            className="form-control"
                            placeholder="Description" />
                    </div>

                    <div>
                        <label className="font-weight-bold">URL:</label>
                        <input
                            onChange={this.handleInputs}
                            type="text"
                            name="urlValue"
                            style={state.urlValueAlert}
                            value={state.urlValue}
                            title={state.urlValueTitle}
                            className="form-control"
                            placeholder="URL" />
                    </div>

                    <div className="dropdown-edit-resource">
                        <label className="font-weight-bold">Resource:</label>

                        <div className="dropdown">
                            <button 
                                onClick={(event)=>event.preventDefault()} 
                                className="dropbtn">
                                {state.resourceValue}
                            </button>

                            <div className="dropdown-content">
                                <a onClick={this.handleDropdownMenu} href="#">NodeJS</a>
                                <a onClick={this.handleDropdownMenu} href="#">Spring boot</a>
                                <a onClick={this.handleDropdownMenu} href="#">Another test</a>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={this.handleSaveButton}
                        className="btn btn-success">
                        Save
                    </button>
                </form>

                <Link to="/training/resources">Back to list</Link>
            </section>
        );
    }
}

export default EditResources;