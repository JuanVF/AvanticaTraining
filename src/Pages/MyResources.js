import React from 'react';

import ResourceCRUDSelector from '../Components/ResourceCRUDSelector';

import './Styles/MyResources.css';

class MyResources extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            tableData : [],
            crudStatus : "ADD"
        };
    }

    componentDidMount(){
        let access_token = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkYWVuZXJ5c0B0YXJnYXJ5ZW4uY29tIiwiZXhwIjoxNTczMjQwNzY5fQ.GGDYEe5nqyqhmmY87PanwNXqNnSkPYfS1QnHDjTXLD1kQfrJcPqLTyyWqS9Li4R3BwtW1SXXdWirhr5fEzgQnw';
        let url = 'http://localhost:8080/resource';
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
                    <th>{item.resource_id}</th>
                    <th><a href={item.url}>{item.url}</a></th>
                    <th>{`${item.topic.topic_id}-${item.topic.name}`}</th>
                    <th>{item.description}</th>
                    <th>
                        <div>
                            <button className="btn btn-info">Edit</button>
                            <button className="btn btn-danger">Delete</button>
                        </div>
                    </th>
                </tr>
            )
        });

        return tableContent;
    }
    
    render() { 
        return (
            <section className="my_resources_container">
                <ResourceCRUDSelector status={this.state.crudStatus}/>
                <div>
                    <h1>My Resources</h1>
                    <table className="table table-striped">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="column">Id</th>
                                <th scope="column">Url</th>
                                <th scope="column">Topic</th>
                                <th scope="column">Description Name</th>
                                <th>Action</th>
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
 
export default MyResources;