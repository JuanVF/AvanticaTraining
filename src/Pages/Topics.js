import React from 'react';

import TopicCRUDSelector from '../Components/TopicCRUDSelector';

import './Styles/Topics.css';

class Topics extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            tableData : [],
            crudStatus : "ADD"
        };
    }

    componentDidMount(){
        let access_token = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkYWVuZXJ5c0B0YXJnYXJ5ZW4uY29tIiwiZXhwIjoxNTczMjQwNzY5fQ.GGDYEe5nqyqhmmY87PanwNXqNnSkPYfS1QnHDjTXLD1kQfrJcPqLTyyWqS9Li4R3BwtW1SXXdWirhr5fEzgQnw';
        let url = 'http://localhost:8080/topic';
        let params = {
            method : 'GET',
            headers : {
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Authorization':access_token
            }
        };
        let context = this;

        fetch(url,params)
        .then((res)=>res.json())
        .then((res)=>{
            context.setState({
                tableData : res
            });
        })
        .catch(err=>console.log(err));
    }

    generateTableContent = ()=>{
        let tableContent = this.state.tableData.map((item,index)=>{
            return(
                <tr key={index}>
                    <th>{item.topic_id}</th>
                    <th>{item.name}</th>
                    <th>
                        <div>
                            <button className="btn btn-info">Edit</button>
                            <button className="btn btn-danger">Save</button>
                        </div>
                    </th>
                </tr>
            )
        });

        return tableContent;
    }
    
    render(){
        return(
            <section className="topics_container">
                <TopicCRUDSelector status={this.state.crudStatus}/>
                <div>
                    <h1>My Topics</h1>
                    <table className="table table-striped">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Name</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.generateTableContent()}
                        </tbody>
                    </table>
                </div>
            </section>
        );
    }
}

export default Topics;