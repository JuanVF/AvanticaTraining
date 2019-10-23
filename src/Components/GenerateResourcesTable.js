import React from 'react';
import { Link } from 'react-router-dom';

//This component generates the rows for the resources table
//in src/Pages/MyResources.js"
function GenerateResourcesTable(props){
    const tableData = props.tableData;

    const tableContent = tableData.map((item)=>{
        let path = `/training/resources/edit/${item.id}`;
        
        return (
            <tr key={(item.id).toString()}>
                <th scope="row">
                    <Link to={path}>{item.id}</Link>
                </th>
                <th>{item.name}</th>
            </tr>
        );
    });

    return tableContent;
}
 
export default GenerateResourcesTable;