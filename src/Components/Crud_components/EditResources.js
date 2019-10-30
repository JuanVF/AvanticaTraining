import React from 'react';
import { Link } from 'react-router-dom';

import util from '../../Util/Util';

import '../Styles/EditResources.css';
import '../Styles/AddResource.css';

class EditResources extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            descriptionValue : "",
            urlValue : "",
            descriptionValueTitle : "",
            urlValueTitle : "",
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
                [item.name+"Title"] : ""
            });
        }else{
            this.setState({
                [item.name] : item.value,
                [item.name+"Title"] : "Please fill out this field"
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
            <div className="edit_resource_container">
                <h1>Edit Resource</h1>

                <form className="justify-content-start">
                    <div>
                        <label className="font-weight-bold">Description:</label>
                        <input
                            onChange={this.handleInputs}
                            type="text"
                            name="descriptionValue"
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
                                <p onClick={this.handleDropdownMenu}>NodeJS</p>
                                <p onClick={this.handleDropdownMenu}>Spring boot</p>
                                <p onClick={this.handleDropdownMenu}>Another test</p>
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
            </div>
        );
    }
}

export default EditResources;