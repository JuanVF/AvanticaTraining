import React from 'react'
import ls from 'local-storage'
import Util from '../../Util/Util'

import { TopicsUI } from './ui'

import './style.css'

class Topics extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      tableData: [],
      editItem: null,
      showEditComponent: false,
      isModalVisible: false,
      modalMessage: ''
    }
  }

  componentDidMount() {
    this.updateTableData()
  }

  updateTableData = async () => {
    let tableData = await Util.FetchTopic.getTopics()

    this.setState({
      tableData: tableData
    })
  }

  openEditComponent = item => {
    this.setState({
      editItem: item,
      showEditComponent: true
    })
  }

  closeEditComponent = () => {
    this.setState({
      showEditComponent: false
    })
  }

  handleDeleteButton = async (event, id) => {
    event.preventDefault()

    let isConfirmed = prompt(
      'Are you sure you want to delete this topic?[Yes/y]'
    )

    let relations = await Util.FetchResource.checkHowManyRelationsAre(id)

    if (this.userWantsToDeleteTopic(isConfirmed, relations)) {
      this.closeEditComponent()

      await Util.FetchTopic.deleteTopic(id)
      
      this.updateTableData()
    }
  }

  userWantsToDeleteTopic = (isConfirmed, relations) => {
    if (isConfirmed === null) return false

    isConfirmed = isConfirmed.toLowerCase()

    if (isConfirmed === 'yes' || isConfirmed === 'y') {
      if (relations.length === 0) return true

      this.toggleModal(
        'You should remove the resources that references this topic'
      )
    }

    return false
  }

  toggleModal = message => {
    setTimeout(() => {
      this.setState({
        isModalVisible: false
      })
    }, 5000)

    this.setState({
      isModalVisible: !this.isModalVisible,
      modalMessage: message
    })
  }

  render() {
    if (ls.get('login_token') === null) {
      document.location = '/'
    }
    return (
      <TopicsUI
        {...this.state}
        updateTableData={this.updateTableData}
        closeEditComponent={this.closeEditComponent}
        openEditComponent={this.openEditComponent}
        handleDeleteButton={this.handleDeleteButton}
      />
    )
  }
}

export default Topics
