import React from 'react';

function SetTableContent(props) {
    let tableData = props.tableContent;

    const tableItems = tableData.map((item) => {
        return (
            <tr key={(item.id).toString()}>
                <th scope="row">{item.topic}</th>
                <th>{item.resources}</th>
            </tr>
        )
    });

    return tableItems;
}

export default SetTableContent;