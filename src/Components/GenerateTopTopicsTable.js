import React from 'react';

//This function generates all the rows for the top ten topics table
//that is located in src/Components/TopTenTopics.js
function GenerateTopTopicsTable(props) {
    let tableData = props.tableContent;
    
    const tableItems = tableData.map((item) => {
        return (
            <tr key={(item.id).toString()}>
                <th scope="row">
                    {item.topic}
                </th>
                <th>{item.resources}</th>
            </tr>
        );
    });

    return tableItems;
}

export default GenerateTopTopicsTable;