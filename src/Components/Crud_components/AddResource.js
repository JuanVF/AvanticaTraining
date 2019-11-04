import React from 'react';
import ls from 'local-storage';

import util from '../../Util/Util';

import '../Styles/CRUDTopics.css';
import '../Styles/AddResource.css';

class AddResource extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            resourceValue: undefined,
            descriptionValue: "",
            urlValue: "",
            descriptionValueTitle: "Please fill out this field",
            urlValueTitle: "Please fill out this field",
            dropdownItems : [],
            dropdownValue : '',
        };
    }

    //In this case ComponentDidMount fetch topics to fill the dropdown items
    async componentDidMount(){
        let access_token = ls.get("login_token");
        let dropdownItems = await util.FetchTopic.getTopics(access_token);
        let dropdownValue = `${dropdownItems[0].topic_id} - ${dropdownItems[0].name}`;
        
        this.setState({
            dropdownItems : dropdownItems,
            resourceValue : dropdownItems[0].topic_id,
            dropdownValue : dropdownValue
        })
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
    handleSaveButton = async(event) => {
        event.preventDefault();

        let objectCollection = [
            this.state.resourceValue,
            this.state.descriptionValue,
            this.state.urlValue
        ];

        if (!util.Alerts.alertIfObjectsAreEmpty(objectCollection)) {
            let access_token = ls.get("login_token");
            let body = {
                description: this.state.descriptionValue,
                url: this.state.urlValue,
                topic: {
                    topic_id: this.state.resourceValue
                }
            }

            await util.FetchResource.save(access_token,body);
            //This will rerender the table
            this.cleanInputs();
            this.props.closeEditContainer();
        }
    }

    cleanInputs = ()=>{
        let dropdownValue = `${this.state.dropdownItems[0].topic_id} - ${this.state.dropdownItems[0].name}`;

        this.setState({
            resourceValue : this.state.dropdownItems[0].topic_id,
            dropdownValue : dropdownValue,
            descriptionValue : '',
            urlValue : ''
        })
    }

    //This function generate the items for the dropdown
    generateDropdownItems = ()=>{
        let dropdownItems = this.state.dropdownItems;

        let dropdown = dropdownItems.map((item,index)=>{
            return(
                <p key={index} onClick={(event)=>this.handleDropdown(event,item)}>
                    {item.topic_id} - {item.name}
                </p>
            );
        });

        return dropdown;
    }

    render() {
        let state = this.state;

        return (
            <div className="add_resource_container crud_topic_container overflow-auto">
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
                        <div className="dropdown-content overflow-auto">
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