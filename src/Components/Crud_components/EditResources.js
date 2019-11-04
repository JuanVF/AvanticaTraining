import React from 'react';
import ls from 'local-storage';
import util from '../../Util/Util';

import '../Styles/EditResources.css';
import '../Styles/AddResource.css';

class EditResources extends React.Component {
    constructor(props){
        super(props);

        let selectedItem = props.selectedItem;

        this.state = {
            descriptionValue : selectedItem.description,
            urlValue : selectedItem.url,
            descriptionValueTitle : "",
            urlValueTitle : "",
            resourceValue : selectedItem.topic.topic_id,
            dropdownValue : `${selectedItem.topic.topic_id} - ${selectedItem.topic.name}`,
            dropdownItems : []
        };
    }

    componentDidMount = async()=>{
        let access_token = ls.get('login_token');
        let data = await util.FetchTopic.getTopics(access_token);

        this.setState({
            dropdownItems : data
        });
    }

    //This function allows the user to change the dropdown menu item selected
    handleDropdownMenu = (event,item)=>{
        event.preventDefault();

        this.setState({
            resourceValue : item.topic_id,
            dropdownValue : `${item.topic_id} - ${item.name}`
        });
        
    }

    //This functions sets the value in state and makes an alert if the inputs is empty
    handleInputs = (event)=>{
        let item = event.target;

        if(item.value !== ""){
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
    handleSaveButton = async(event)=>{
        event.preventDefault();

        let objectCollection = [
            this.state.urlValue,
            this.state.descriptionValue
        ];
        
        if(!util.Alerts.alertIfObjectsAreEmpty(objectCollection)){
            let body = {
                resource_id : this.props.selectedItem.resource_id,
                description : this.state.descriptionValue,
                url : this.state.urlValue,
                topic : {
                    topic_id : this.state.resourceValue
                }
            }
            let access_token = ls.get('login_token'); 

            await util.FetchResource.update(access_token,body);
            
            this.props.closeEditContainer();
        }
    }

    //This function generate the items for the dropdown
    generateDropdownItems = ()=>{
        let dropdownItems = this.state.dropdownItems;

        let dropdown = dropdownItems.map((item,index)=>{
            return(
                <p key={index} onClick={(event)=>this.handleDropdownMenu(event,item)}>
                    {item.topic_id} - {item.name}
                </p>
            );
        });

        return dropdown;
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
                                {state.dropdownValue}
                            </button>

                            <div className="dropdown-content">
                                {this.generateDropdownItems()}
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={this.handleSaveButton}
                        className="btn btn-success">
                        Save
                    </button>
                </form>

                <p onClick={this.props.closeEditContainer}>Back to list</p>
            </div>
        );
    }
}

export default EditResources;