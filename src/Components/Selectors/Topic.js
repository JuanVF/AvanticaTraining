import React from 'react'

import AddTopics from '../AddTopics/'
import EditTopic from '../EditTopic/'

function TopicSelector(props) {
  if (props.status === 'EDIT') {
    return (
      <EditTopic
        editItem={props.editItem}
        onEditFinish={props.onEditFinish}
        onUpdate={props.onUpdate}
      />
    )
  }

  return <AddTopics onUpdate={props.onUpdate} />
}

export default TopicSelector
