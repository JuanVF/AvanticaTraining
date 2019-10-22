import React from 'react';
import { Link } from 'react-router-dom';


class AddResource extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            resourceValue: "Spring Boot",
            descriptionValue : "",
            urlValue : ""
        };
    }

    handleDropdown = (event)=>{
        let value = event.target.innerHTML;

        this.setState({
            resourceValue : value
        })
    }

    handleInputs = (event)=>{
        this.setState({
            [event.target.name] : event.target.value
        });
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
                        className="form-control" 
                        placeholder="Description" />
                    <input 
                        onChange={this.handleInputs}
                        value={state.urlValue} 
                        name="urlValue" 
                        type="text" 
                        className="form-control" 
                        placeholder="URL" />
                    <div class="dropdown">
                        <button class="dropbtn">{state.resourceValue}</button>
                        <div class="dropdown-content">
                            <a onClick={this.handleDropdown} href="#">NodeJS</a>
                            <a onClick={this.handleDropdown} href="#">Spring boot</a>
                            <a onClick={this.handleDropdown} href="#">Another test</a>
                        </div>
                    </div>
                    <div>
                        <button className="btn save_button">Save</button>
                        <Link to="/training/resources">Back to list</Link>
                    </div>
                </form>
            </section>

        );
    }
}

export default AddResource;