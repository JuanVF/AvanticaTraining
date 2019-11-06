import React from 'react'

import EditResource from '../EditResource/'
import AddResource from '../AddResource/'

function Resource(props) {
  if (props.status === 'EDIT') {
    return (
      <EditResource
        closeEditContainer={props.closeEditContainer}
        selectedItem={props.selectedItem}
      />
    )
  }

  return <AddResource closeEditContainer={props.closeEditContainer} />
}

export default Resource
