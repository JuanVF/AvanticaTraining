import React from 'react'

import AddTopics from '../AddTopics/'
import EditTopic from '../EditTopic/'

function TopicSelector(props) {
  if (props.showEditComponent) {
    return (
      <EditTopic
        editItem={props.editItem}
        closeEditComponent={props.closeEditComponent}
        updateTableData={props.updateTableData}
      />
    )
  }

  return <AddTopics updateTableData={props.updateTableData} />
}

export default TopicSelector
