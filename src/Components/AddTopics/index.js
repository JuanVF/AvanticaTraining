import React from 'react'
import util from '../../Util/Util'

import { AddTopicUI } from './ui'

class AddTopics extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      nameValue: '',
      nameTitle: 'Please fill out this field',
      isModalVisible: false,
      modalMessage: ''
    }
  }

  handleInputValues = event => {
    let component = event.target
    let itemValues = {
      [component.name + 'Value']: component.value,
      [component.name + 'Title']: 'Please fill out this field'
    }

    if (component.value) itemValues[component.name + 'Title'] = ''

    this.setState(itemValues)
  }

  handleSaveButton = event => {
    event.preventDefault()

    let nameValue = this.state.nameValue
    if (!util.Alerts.alertIfIsEmpty(nameValue, this.toggleModal)) {
      this.addNewTopic()
    }
  }

  addNewTopic = async function() {
    let topic = {
      name: this.state.nameValue
    }

    await util.FetchTopic.saveTopic(topic)
    this.cleanInputs()
    this.props.updateTableData()
  }

  cleanInputs = () => {
    this.setState({
      nameValue: ''
    })
  }

  toggleModal = message => {
    setTimeout(() => {
      this.setState({
        isModalVisible: false
      })
    }, 4000)

    this.setState({
      isModalVisible: !this.isModalVisible,
      modalMessage: message
    })
  }

  render() {
    return (
      <AddTopicUI
        {...this.state}
        handleInputValues={this.handleInputValues}
        handleSaveButton={this.handleSaveButton}
      />
    )
  }
}

export default AddTopics
