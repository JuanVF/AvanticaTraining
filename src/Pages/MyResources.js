import React from 'react';
import Util from '../Util/Util';
import ls from 'local-storage';

import ResourceCRUDSelector from '../Components/ResourceCRUDSelector';

import './Styles/MyResources.css';

class MyResources extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tableData: [],
            crudStatus: "ADD",
            selectedItem: undefined
        };
    }

    //TODO: change access_token to a ls.get("login_token") once the merge is done
    componentDidMount = async () => {
        let tableData = await this.getResources();

        this.setState({
            tableData: tableData
        })
    }

    //Function that returns resource data
    getResources = async () => {
        let access_token = ls.get("login_token");
        let tableData = await Util.FetchResource.getAll(access_token);

        return tableData;
    }

    //This functions deletes a resource
    handleDeleteButton = async (event, resource_id) => {
        event.preventDefault();
        let access_token = ls.get("login_token");



        let isConfirmed = prompt("Are you sure you want to delete this topic?[Yes/No]");

        if (isConfirmed.toLowerCase() === "yes") {
            await Util.FetchResource.delete(access_token, resource_id);

            let tableData = await this.getResources();

            this.setState({
                tableData: tableData
            });
        }
    }

    //This functions allows this component to show edit resource component
    handleEditButton = (event, item) => {
        event.preventDefault();
        this.setState({
            selectedItem: item,
            crudStatus: "EDIT"
        });
    }

    //This function will allow the edit resource component to close itself
    closeEditContainer = async () => {
        let tableData = await this.getResources();

        this.setState({
            crudStatus: "ADD",
            tableData: tableData
        })
    }


    //This functions generates the items for the table
    generateTableContent = () => {
        let tableContent = this.state.tableData.map((item, index) => {
            return (
                <tr key={index}>
                    <th>{item.resource_id}</th>
                    <th><a href={item.url}>{item.url}</a></th>
                    <th>{`${item.topic.topic_id}-${item.topic.name}`}</th>
                    <th>{item.description}</th>
                    <th>
                        <div>
                            <button onClick={(event) => this.handleEditButton(event, item)}
                                className="btn btn-info">
                                Edit
                            </button>
                            <button onClick={(event) => this.handleDeleteButton(event, item.resource_id)}
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
                    status={this.state.crudStatus} />
                <div className="mr_table_container overflow-auto">
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
                        <tbody id="mr_table">
                            {this.generateTableContent()}
                        </tbody>
                    </table>
                </div>
            </section>
        );
    }
}

export default MyResources;