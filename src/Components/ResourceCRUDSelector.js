import React from 'react';

import EditResource from './Crud_components/EditResources';
import AddResource from './Crud_components/AddResource';

function TopicCRUDSelector(props){
    if(props.status === "EDIT") return <EditResource/>;

    return <AddResource/>;
}

export default TopicCRUDSelector;