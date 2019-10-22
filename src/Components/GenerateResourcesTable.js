import React from 'react';
import { Link } from 'react-router-dom';

function GenerateResourcesTable(props){
    const tableData = props.tableData;

    const tableContent = tableData.map((item)=>{
        return (
            <tr key={(item.id).toString()}>
                <th scope="row">
                    <Link>{item.id}</Link>
                </th>
                <th>{item.name}</th>
            </tr>
        );
    });

    return tableContent;
}
 
export default GenerateResourcesTable;