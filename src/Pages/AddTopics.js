import React from 'react';
import { Link } from 'react-router-dom';

import './Styles/CRUDTopics.css';

class AddTopics extends React.Component {
    render() { 
        return (
            <section className="container crud_topic_container">
                <h1>Add Topic</h1>
                <form className="justify-content-start">
                    <label className="font-weight-bold ">Name:</label>
                    <input className="form-control" type="text" placeholder="Topic Name"/>
                    <button className="btn">Save</button>
                </form>
                <Link to="/training/topics">Back to list</Link>
            </section>
        );
    }
}
 
export default AddTopics;