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
            crudStatus : "ADD",
            selectedItem : undefined
        };
    }

    //TODO: change access_token to a ls.get("login_token") once the merge is done
    componentDidMount = async()=>{
        let tableData = await this.getResources();
        
        this.setState({
            tableData : tableData
        })
    }
    
    //Function that returns resource data
    getResources = async()=>{
        let access_token = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkYWVuZXJ5c0B0YXJnYXJ5ZW4uY29tIiwiZXhwIjoxNTczMjQwNzY5fQ.GGDYEe5nqyqhmmY87PanwNXqNnSkPYfS1QnHDjTXLD1kQfrJcPqLTyyWqS9Li4R3BwtW1SXXdWirhr5fEzgQnw';

        let tableData = await Util.FetchResource.getAll(access_token);
        console.log(tableData)
        return tableData;
    }

    //
    handleDeleteButton = async(event,resource_id)=>{
        event.preventDefault();
        let access_token = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkYWVuZXJ5c0B0YXJnYXJ5ZW4uY29tIiwiZXhwIjoxNTczMjQwNzY5fQ.GGDYEe5nqyqhmmY87PanwNXqNnSkPYfS1QnHDjTXLD1kQfrJcPqLTyyWqS9Li4R3BwtW1SXXdWirhr5fEzgQnw';

        await Util.FetchResource.delete(access_token,resource_id);

        let tableData = await this.getResources();

        this.setState({
            tableData : tableData
        })
    }

    //This functions allows this component to show edit resource component
    handleEditButton = (event, item)=>{
        event.preventDefault();
        this.setState({
            selectedItem : item,
            crudStatus : "EDIT"
        });
    }

    //This function will allow the edit resource component to close itself
    closeEditContainer = async()=>{
        let tableData = await this.getResources();

        this.setState({
            crudStatus : "ADD",
            tableData : tableData
        })
    }


    //This functions generates the items for the table
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
                            <button onClick={(event)=>this.handleEditButton(event,item)} 
                                    className="btn btn-info">
                                    Edit
                            </button>
                            <button onClick={(event)=>this.handleDeleteButton(event,item.resource_id)}
                                className="btn btn-danger">
                                Delete</button>
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
                <ResourceCRUDSelector closeEditContainer={this.closeEditContainer}
                                      selectedItem={this.state.selectedItem} 
                                      status={this.state.crudStatus}/>
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