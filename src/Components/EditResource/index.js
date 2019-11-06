import React from 'react'
import ls from 'local-storage'
import util from '../../Util/Util'

import Input from '../Input/'
import Modal from '../Modal/'

import './style.css'

class EditResources extends React.Component {
  constructor(props) {
    super(props)

    let selectedItem = props.selectedItem

    this.state = {
      resource_id: selectedItem.resource_id,
      descriptionValue: selectedItem.description,
      urlValue: selectedItem.url,
      descriptionValueTitle: '',
      urlValueTitle: '',
      resourceValue: selectedItem.topic.topic_id,
      dropdownValue: `${selectedItem.topic.topic_id} - ${selectedItem.topic.name}`,
      dropdownItems: [],
      isModalVisible: false,
      modalMessage: ''
    }
  }

  componentDidMount = async () => {
    let access_token = ls.get('login_token')
    let data = await util.FetchTopic.getTopics(access_token)
    this.setState({
      dropdownItems: data
    })
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.selectedItem.resource_id !== this.props.selectedItem.resource_id
    ) {
      let selectedItem = this.props.selectedItem

      this.setState({
        resource_id: selectedItem.resource_id,
        descriptionValue: selectedItem.description,
        urlValue: selectedItem.url,
        resourceValue: selectedItem.topic.topic_id,
        dropdownValue: `${selectedItem.topic.topic_id} - ${selectedItem.topic.name}`
      })
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let selectedItem = nextProps.selectedItem

    if (selectedItem.resource_id !== prevState.resource_id) {
      return nextProps
    }
    return null
  }

  handleDropdownMenu = (event, item) => {
    event.preventDefault()

    this.setState({
      resourceValue: item.topic_id,
      dropdownValue: `${item.topic_id} - ${item.name}`
    })
  }

  handleInputs = event => {
    let item = event.target

    if (item.value !== '') {
      this.setState({
        [item.name]: item.value,
        [item.name + 'Title']: ''
      })
    } else {
      this.setState({
        [item.name]: item.value,
        [item.name + 'Title']: 'Please fill out this field'
      })
    }
  }

  handleSaveButton = async event => {
    event.preventDefault()

    let objectCollection = [this.state.urlValue, this.state.descriptionValue]

    if (
      !util.Alerts.alertIfObjectsAreEmpty(objectCollection, this.toggleModal)
    ) {
      this.saveResource()
    }
  }

  saveResource = async () => {
    let body = {
      resource_id: this.state.resource_id,
      description: this.state.descriptionValue,
      url: this.state.urlValue,
      topic: {
        topic_id: this.state.resourceValue
      }
    }
    let access_token = ls.get('login_token')

    await util.FetchResource.update(access_token, body)

    this.props.closeEditContainer()
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
    let state = this.state

    return (
      <React.Fragment>
        <div className='edit_resource_container'>
          <h1>Edit Resource</h1>

          <form className='justify-content-start'>
            <Input
              name='descriptionValue'
              label='Description:'
              handleInputs={this.handleInputs}
              value={state.descriptionValue}
              title={state.descriptionValueTitle}
              placeholder='Description'
            />

            <Input
              name='urlValue'
              label='URL:'
              handleInputs={this.handleInputs}
              value={state.urlValue}
              title={state.urlValueTitle}
              placeholder='URL'
            />

            <div className='dropdown-edit-resource'>
              <label className='font-weight-bold'>Resource:</label>

              <div className='dropdown'>
                <button
                  onClick={event => event.preventDefault()}
                  className='dropbtn'
                >
                  {state.dropdownValue}
                </button>

                <div className='dropdown-content overflow-auto'>
                  <GenerateDropdownItems
                    dropdownItems={state.dropdownItems}
                    handleDropdownMenu={this.handleDropdownMenu}
                  />
                </div>
              </div>
            </div>

            <button onClick={this.handleSaveButton} className='btn btn-success'>
              Save
            </button>
          </form>

          <p className='text-primary' onClick={this.props.closeEditContainer}>
            Back to list
          </p>
        </div>
        <Modal
          isVisible={this.state.isModalVisible}
          message={this.state.modalMessage}
        />
      </React.Fragment>
    )
  }
}

function GenerateDropdownItems(props) {
  let dropdownItems = props.dropdownItems

  let dropdown = dropdownItems.map((item, index) => {
    return (
      <p key={index} onClick={event => props.handleDropdownMenu(event, item)}>
        {item.topic_id} - {item.name}
      </p>
    )
  })

  return dropdown
}

export default EditResources
