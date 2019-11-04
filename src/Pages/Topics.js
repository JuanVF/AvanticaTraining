import React from 'react';
import ls from 'local-storage';
import Util from '../Util/Util';

import TopicCRUDSelector from '../Components/TopicCRUDSelector';

import './Styles/Topics.css';

class Topics extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            tableData : [],
            crudStatus : "ADD",
            editId : null
        };
    }

    //This fetch the data for the table
    componentDidMount(){
        this.getTopics();
    }

    //This allows the edit component to shows itself and also set the id
    //get update
    setEditMode = (id)=>{
        this.setState({
            editId : id,
            crudStatus : "EDIT"
        });
    }

    //This allows the edit component to show the AddTopic component when it is done
    setAddMode = ()=>{
        this.setState({
            crudStatus : "ADD"
        });
    }

    //This functions fetch the API to get topics data
    getTopics = async ()=>{
        let access_token = ls.get("login_token");
        let tableData = await Util.FetchTopic.getTopics(access_token);

        this.setState({
            tableData : tableData
        });
    }

    //This functions fetch the API to DELETE topics data
    deleteTopic = async (event,id)=>{
        event.preventDefault();
        
        let access_token = ls.get("login_token");
        let isConfirmed = prompt("Are you sure you want to delete this topic?[Yes/No]");
        let relations = await Util.FetchResource.checkHowManyRelationsAre(access_token,id);

        if(isConfirmed.toLowerCase() === "yes"){
            if(relations.length === 0){
                await Util.FetchTopic.deleteTopic(access_token,id);
                this.getTopics();
            }else{
                alert("You should remove the resource that references this topics");
            }
        }
    }
    
    //This functions generates the rows with the Topic data
    generateTableContent = ()=>{
        let tableContent = this.state.tableData.map((item,index)=>{
            return(
                <tr key={index}>
                    <th>{item.topic_id}</th>
                    <th>{item.name}</th>
                    <th>
                        <div>
                            <button 
                                onClick={()=>{this.setEditMode(item.topic_id)}} 
                                className="btn btn-info">
                                Edit
                            </button>
                            <button 
                                onClick={(event)=>this.deleteTopic(event,item.topic_id)} 
                                className="btn btn-danger">
                                Delete
                            </button>
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
                <TopicCRUDSelector onUpdate={this.getTopics} 
                                    onEditFinish={this.setAddMode}
                                    status={this.state.crudStatus}
                                    editId={this.state.editId}/>
                <div className="tp_table_container overflow-auto">
                    <h1>My Topics</h1>
                    <table onClick={()=>this.componentDidMount()} className="table table-striped">
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