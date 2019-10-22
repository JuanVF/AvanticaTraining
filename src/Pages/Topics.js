import React from 'react';

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
            <section className="container">
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
                <button className="btn primary_button">New</button>
            </section>
        );
    }
}

export default Topics;