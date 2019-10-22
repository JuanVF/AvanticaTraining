import React from 'react';

function GenerateTopicsTable(props){
    const tableData = props.tableData;

    const tableContent = tableData.map((item)=>{
        return(
            <tr key={item.id}>
                <th scope="row">{item.id}</th>
                <th>{item.name}</th>
            </tr>
        )
    });

    return tableContent;
}

export default GenerateTopicsTable;