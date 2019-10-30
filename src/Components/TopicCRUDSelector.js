import React from 'react';

import AddTopics from './Crud_components/AddTopics';
import EditTopic from './Crud_components/EditTopic';

function TopicCRUDSelector(props){
    if(props.status === "EDIT") return <EditTopic/>;

    return <AddTopics/>
}

export default TopicCRUDSelector;