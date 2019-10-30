import React from 'react';
import ls from 'local-storage';

import util from '../../Util/Util';

import '../Styles/CRUDTopics.css';
import '../Styles/AddResource.css';

class AddResource extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dropdownData : [],
            resourceDesc : "",
            resourceValue: undefined,
            descriptionValue: "",
            urlValue: "",
            descriptionValueTitle: "Please fill out this field",
            urlValueTitle: "Please fill out this field"
        };
    }

    async componentDidMount(){
        let access_token = ls.get("login_token");
        let dropdownData = await util.FetchTopic.getTopics(access_token);
        let resourceDesc = `${dropdownData[0].topic_id} - ${dropdownData[0].name}`;
        
        console.log(resourceDesc)

        this.setState({
            dropdownData : dropdownData,
            resourceValue : dropdownData[0].topic_id,
            resourceDesc : resourceDesc
        })
    }

    //This function sets the resource value and the dropdown box texts
    handleDropdown = (event,item) => {
        event.preventDefault();

        this.setState({
            resourceValue: item.topic_id,
            resourceDesc : `${item.topic_id} - ${item.name}`
        })
    }

    //This function handle the inputs value and set a warning if the value is empty
    handleInputs = (event) => {
        event.preventDefault();

        let value = event.target.value;
        let compare = util.Compare;

        if (!compare.isAnEmptyString(value)) {
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
    handleSaveButton = (event) => {
        event.preventDefault();

        let objectCollection = [
            this.state.resourceValue,
            this.state.descriptionValue,
            this.state.urlValue
        ];

        if (!util.Alerts.alertIfObjectsAreEmpty(objectCollection)) {
            document.location = "/training/resources"
        }
    }

    generateDropdownItems = ()=>{
        let dropdownContent = this.state.dropdownData.map((item,index)=>{
            return <p key={index} onClick={(event)=>this.handleDropdown(event,item)}>
                {item.topic_id} - {item.name}
            </p>
        });

        return dropdownContent;
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
                            {state.resourceDesc}
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