import React from 'react';

//This component generates the rows for the resources table
//in src/Pages/MyResources.js"
function GenerateResourcesTable(props){
    const tableData = props.tableData;

    const tableContent = tableData.map((item)=>{
        return (
            <tr key={(item.id).toString()}>
                <th scope="row">{item.id}</th>
                <th>{item.name}</th>
            </tr>
        );
    });

    return tableContent;
}
 
export default GenerateResourcesTable;