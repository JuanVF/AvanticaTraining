import React from 'react';
import { Link } from 'react-router-dom';

import './Styles/CRUDTopics.css'

class EditTopic extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            topicName: "NodeJS",
            inputAlertColor : {
                borderLeft : '5px solid #42A948'
            }
        };
    }

    handleChange(value){
        if (value !== "") {
            this.setState({
                topicName: value,
                inputAlertColor : {
                    borderLeft : '5px solid #42A948'
                }
            });
        }else{
            this.setState({
                topicName: value,
                inputAlertColor : {
                    borderLeft : '5px solid #AB4846'
                }
            });
        }
    }

    render() {
        let state = this.state;
        return (
            <section className="container crud_topic_container">
                <h1>Edit Topic</h1>
                <form className="justify-content-start">
                    <label className="font-weight-bold ">Name:</label>
                    <input 
                        className="form-control" 
                        style={state.inputAlertColor} 
                        type="text" 
                        value={state.topicName}
                        placeholder="Topic Name" 
                        onChange={e => this.handleChange(e.target.value)} />
                    <button className="btn">Save</button>
                </form>
                <Link to="/training/topics">Back to list</Link>
            </section>
        );
    }
}

export default EditTopic;