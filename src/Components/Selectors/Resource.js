import React from 'react'

import EditResource from '../EditResource/'
import AddResource from '../AddResource/'

function Resource(props) {
  if (props.status === 'EDIT') {
    return (
      <EditResource
        closeEditComponent={props.closeEditComponent}
        selectedItem={props.selectedItem}
      />
    )
  }

  return <AddResource updateTableContent={props.closeEditComponent} />
}

export default Resource
