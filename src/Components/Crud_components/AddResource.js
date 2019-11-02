import React from 'react';

import util from '../../Util/Util';

import '../Styles/CRUDTopics.css';
import '../Styles/AddResource.css';

class AddResource extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            resourceValue: "Spring Boot",
            descriptionValue: "",
            urlValue: "",
            descriptionValueTitle: "Please fill out this field",
            urlValueTitle: "Please fill out this field",
            dropdownItems : [],
            dropdownValue : '',
        };
    }

    componentDidMount = async()=>{
        //Change this to its respective fetch function in Util.js
        //Also get the login_token with local-storage
        let access_token = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkYWVuZXJ5c0B0YXJnYXJ5ZW4uY29tIiwiZXhwIjoxNTczMjQwNzY5fQ.GGDYEe5nqyqhmmY87PanwNXqNnSkPYfS1QnHDjTXLD1kQfrJcPqLTyyWqS9Li4R3BwtW1SXXdWirhr5fEzgQnw';
        let data;

        let url = 'http://localhost:8080/topic';
        let params = {
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization': access_token
            }
        };
        
        await fetch(url,params)
        .then((res)=>res.json())
        .then((res)=>{
            data = res
        });

        this.setState({
            dropdownItems : data,
            dropdownValue : `${data[0].topic_id} - ${data[0].name}`
        });
    }

    //This function sets the resource value and the dropdown box texts
    handleDropdown = (event,item) => {
        event.preventDefault();

        this.setState({
            resourceValue: item.topic_id,
            dropdownValue : `${item.topic_id} - ${item.name}`
        })
    }

    //This function handle the inputs value and set a warning if the value is empty
    handleInputs = (event) => {
        event.preventDefault();

        let value = event.target.value;

        if (value !== "") {
            this.setState({
                [event.target.name]: event.target.value,
                [event.target.name+"Title"] : ""
            });
        } else {
            this.setState({
                [event.target.name]: event.target.value,
                [event.target.name+"Title"] : "Please fill out this field"
            });
        }
    }

    //This function alerts the user to fill out the red inputs if they are empty
    //TODO: Handle the fetch to save the new resource
    handleSaveButton = async(event) => {
        event.preventDefault();

        let objectCollection = [
            this.state.resourceValue,
            this.state.descriptionValue,
            this.state.urlValue
        ];

        if (!util.Alerts.alertIfObjectsAreEmpty(objectCollection)) {
            let access_token = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkYWVuZXJ5c0B0YXJnYXJ5ZW4uY29tIiwiZXhwIjoxNTczMjQwNzY5fQ.GGDYEe5nqyqhmmY87PanwNXqNnSkPYfS1QnHDjTXLD1kQfrJcPqLTyyWqS9Li4R3BwtW1SXXdWirhr5fEzgQnw';
            let body = {
                description: this.state.descriptionValue,
                url: this.state.urlValue,
                topic: {
                    topic_id: this.state.resourceValue
                }
            }

            await util.FetchResource.save(access_token,body);
            this.props.closeEditContainer();
        }
    }

    //This function generate the items for the dropdown
    generateDropdownItems = ()=>{
        let dropdownItems = this.state.dropdownItems;

        let dropdown = dropdownItems.map((item,index)=>{
            return(
                <a key={index} onClick={(event)=>this.handleDropdown(event,item)}>
                    {item.topic_id} - {item.name}
                </a>
            );
        });

        return dropdown;
    }

    render() {
        let state = this.state;

        return (
            <div className="add_resource_container crud_topic_container">
                <h1>Add Resource</h1>

                <form>
                    <input
                        onChange={this.handleInputs}
                        value={state.descriptionValue}
                        name="descriptionValue"
                        type="text"
                        title={state.descriptionValueTitle}
                        className="form-control"
                        placeholder="Description" />

                    <input
                        onChange={this.handleInputs}
                        value={state.urlValue}
                        name="urlValue"
                        title={state.urlValueTitle}
                        type="text"
                        className="form-control"
                        placeholder="URL" />

                    <div className="dropdown">
                        <button
                            onClick={(event) => event.preventDefault()}
                            className="dropbtn">
                            {state.dropdownValue}
                        </button>
                        <div className="dropdown-content">
                            {this.generateDropdownItems()}
                        </div>
                    </div>

                    <div>
                        <button
                            onClick={this.handleSaveButton}
                            className="btn save_button">
                            Save
                        </button>
                    </div>
                </form>
            </div>

        );
    }
}

export default AddResource;