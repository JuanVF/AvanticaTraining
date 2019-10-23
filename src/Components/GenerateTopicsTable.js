import React from 'react';
import { Link } from 'react-router-dom';

//This component will generate the rows for table in
//src/Pages/Topics.js
function GenerateTopicsTable(props) {
    const tableData = props.tableData;

    const tableContent = tableData.map((item) => {
        let path = `/training/topics/edit/${item.id}`;

        return (
            <tr key={item.id}>
                <th scope="row">
                    <Link to={path}>{item.id}</Link>
                </th>
                <th>{item.name}</th>
            </tr>
        )
    });

    return tableContent;
}

export default GenerateTopicsTable;