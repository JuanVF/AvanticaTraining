import React from 'react';

import GenerateResourcesTable from '../Components/GenerateResourcesTable';

import './Styles/MyResources.css';

class MyResources extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            tableData : [
                {
                    id: 10,
                    name : "Microservice with spring boot"
                },
                {
                    id: 11,
                    name : "Build Microservice"
                },
                {
                    id: 12,
                    name : "Spring boot JPA"
                },
                {
                    id: 13,
                    name : "Concurrency Patterns"
                },
                {
                    id: 14,
                    name : "multithreading-patterns-presentation"
                },
            ]
        };
    }

    //TODO: Once the API is done, fetch topics and verify if has data
    //because to add a new resource requires at least one topic on DB
    handleNewButton = (event)=>{
        event.preventDefault();

        document.location = "/training/resources/add"
    }
    
    render() { 
        return (
            <section className="container my_resources_container">
                <h1>My Resources</h1>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="column">Id</th>
                            <th scope="column">Description Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        <GenerateResourcesTable tableData={this.state.tableData}/>
                    </tbody>
                </table>
                <button onClick={this.handleNewButton} className="btn">New</button>
            </section>
        );
    }
}
 
export default MyResources;