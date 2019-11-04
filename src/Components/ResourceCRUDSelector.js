import React from 'react';

import EditResource from './Crud_components/EditResources';
import AddResource from './Crud_components/AddResource';

function TopicCRUDSelector(props){
    if(props.status === "EDIT") {
        return <EditResource 
                    closeEditContainer={props.closeEditContainer}
                    selectedItem={props.selectedItem}/>;
    }
    
    return <AddResource closeEditContainer={props.closeEditContainer}/>;
}

export default TopicCRUDSelector;