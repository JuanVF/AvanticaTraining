import React from 'react';
import Util from '../Util/Util';
import ls from 'local-storage';

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

    //This sets the initial data for the resource table
    componentDidMount(){
        this.getResources();
    }

    //This function fetch the API to get resource data
    getResources = async ()=>{
        let access_token = ls.get("login_token");
        let tableData = await Util.FetchResource.getResources(access_token);

        this.setState({
            tableData : tableData
        });
    }

    //This function generates the rows for the resource table
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