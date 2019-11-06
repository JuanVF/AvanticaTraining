import React from 'react'
import ls from 'local-storage'

import util from '../../Util/Util'

import Modal from '../Modal/'

import './style.css'

class AddResource extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      resourceValue: undefined,
      descriptionValue: '',
      urlValue: '',
      descriptionValueTitle: 'Please fill out this field',
      urlValueTitle: 'Please fill out this field',
      dropdownItems: [],
      dropdownValue: '',
      isModalVisible: false,
      modalMessage: ''
    }
  }

  async componentDidMount() {
    let access_token = ls.get('login_token')
    let dropdownItems = await util.FetchTopic.getTopics(access_token)
    let dropdownValue = `${dropdownItems[0].topic_id} - ${dropdownItems[0].name}`

    this.setState({
      dropdownItems: dropdownItems,
      resourceValue: dropdownItems[0].topic_id,
      dropdownValue: dropdownValue
    })
  }

  handleDropdownValues = (event, item) => {
    event.preventDefault()

    this.setState({
      resourceValue: item.topic_id,
      dropdownValue: `${item.topic_id} - ${item.name}`
    })
  }

  handleInputsValues = event => {
    event.preventDefault()

    let value = event.target.value

    if (value !== '') {
      this.setState({
        [event.target.name]: event.target.value,
        [event.target.name + 'Title']: ''
      })
    } else {
      this.setState({
        [event.target.name]: event.target.value,
        [event.target.name + 'Title']: 'Please fill out this field'
      })
    }
  }

  handleSaveButton = async event => {
    event.preventDefault()

    let objectCollection = [
      this.state.resourceValue,
      this.state.descriptionValue,
      this.state.urlValue
    ]

    if (
      !util.Alerts.alertIfObjectsAreEmpty(objectCollection, this.toggleModal)
    ) {
      this.saveResource()
    }
  }

  saveResource = async () => {
    let access_token = ls.get('login_token')
    let body = {
      description: this.state.descriptionValue,
      url: this.state.urlValue,
      topic: {
        topic_id: this.state.resourceValue
      }
    }

    await util.FetchResource.save(access_token, body)

    this.cleanInputs()
    this.props.closeEditContainer()
  }

  cleanInputs = () => {
    let dropdownValue = `${this.state.dropdownItems[0].topic_id} - ${this.state.dropdownItems[0].name}`

    this.setState({
      resourceValue: this.state.dropdownItems[0].topic_id,
      dropdownValue: dropdownValue,
      descriptionValue: '',
      urlValue: ''
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
    let state = this.state

    return (
      <React.Fragment>
        <div className='add_resource_container crud_topic_container'>
          <h1>Add Resource</h1>

          <form>
            <input
              onChange={this.handleInputsValues}
              value={state.descriptionValue}
              name='descriptionValue'
              type='text'
              title={state.descriptionValueTitle}
              className='form-control'
              placeholder='Description'
            />

            <input
              onChange={this.handleInputsValues}
              value={state.urlValue}
              name='urlValue'
              title={state.urlValueTitle}
              type='text'
              className='form-control'
              placeholder='URL'
            />

            <div className='dropdown'>
              <button
                onClick={event => event.preventDefault()}
                className='dropbtn'
              >
                {state.dropdownValue}
              </button>
              <div className='dropdown-content overflow-auto'>
                <GenerateDropdownItems
                  dropdownItems={this.state.dropdownItems}
                  handleDropdown={this.handleDropdownValues}
                />
              </div>
            </div>

            <div>
              <button
                onClick={this.handleSaveButton}
                className='btn save_button'
              >
                Save
              </button>
            </div>
          </form>
        </div>
        <Modal isVisible={state.isModalVisible} message={state.modalMessage} />
      </React.Fragment>
    )
  }
}

function GenerateDropdownItems(props) {
  let dropdownItems = props.dropdownItems

  let dropdown = dropdownItems.map((item, index) => {
    return (
      <p key={index} onClick={event => props.handleDropdown(event, item)}>
        {item.topic_id} - {item.name}
      </p>
    )
  })

  return dropdown
}

export default AddResource
