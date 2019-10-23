import React from 'react';
import { Link } from 'react-router-dom';

import GenerateTopicsTable from '../Components/GenerateTopicsTable';

import './Styles/Topics.css';

class Topics extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            tableData : [
                {
                    id : 4,
                    name : "NodeJS"
                },
                {
                    id : 5,
                    name : "NoSQL"
                },
                {
                    id : 9,
                    name : "OAUTH"
                },
            ]
        };
    }
    
    render(){
        return(
            <section className="container topics_container">
                <h2>My Topics</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        <GenerateTopicsTable tableData={this.state.tableData}/>
                    </tbody>
                </table>
                <Link to="/training/topics/add" className="btn primary_button back_button">New</Link>
            </section>
        );
    }
}

export default Topics;