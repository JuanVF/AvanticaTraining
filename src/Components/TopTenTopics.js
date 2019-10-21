import React from 'react';

import './Styles/TopTenTopics.css'

import SetTableContent from './SetTableContent';

class TopTenTopics extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            tableContent : [
                {
                  topic: "Spring Boot",
                  resources : 5,
                  id: 1  
                },
                {
                  topic: "Concurrency",
                  resources : 4,
                  id: 2  
                },
                {
                  topic: "Node JS",
                  resources : 2,
                  id: 3  
                },
                {
                  topic: "REST",
                  resources : 1,
                  id: 4  
                },
                {
                  topic: "NoSQL",
                  resources : 1,
                  id: 5  
                },
                {
                  topic: "Angular",
                  resources : 1,
                  id: 6  
                },
                {
                  topic: "Testing",
                  resources : 0,
                  id: 7 
                },
                {
                  topic: "ORM",
                  resources : 0 ,
                  id: 8
                },
                {
                  topic: "OAUTH",
                  resources : 0,
                  id: 9
                },
                {
                  topic: "SOAP",
                  resources : 0,
                  id: 10
                },
            ]
        }
    }
    render(){
        
        return (
            <section className="container">
                <h2>Top ten topics</h2>
                <table className="table table-striped">
                    <thead>
                        <th scope="col">Topic</th>
                        <th scope="col">Resources</th>
                    </thead>
                    <tbody>
                        <SetTableContent tableContent={this.state.tableContent}/>
                    </tbody>
                </table>
            </section>
        );
    }
}

export default TopTenTopics;