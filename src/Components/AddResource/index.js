import React from 'react'
import util from '../../Util/Util'

import { AddResourceUI } from './ui'
import { ResourceError } from '../ResourceError/'

import './style.css'

class AddResource extends React.Component {
  constructor(props) {
    super(props)

    const componentsValues = {
      descriptionValue: '',
      urlValue: '',
      dropdownValue: '',
      resourceValue: undefined
    }

    const componentsTitles = {
      descriptionTitle: 'Please fill out this field',
      urlTitle: 'Please fill out this field'
    }

    this.state = {
      ...componentsValues,
      ...componentsTitles,
      modalMessage: '',
      dropdownItems: null,
      isModalVisible: false
    }
  }

  async componentDidMount() {
    let dropdownItems = await util.FetchTopic.getTopics()
    
    this.showAddTopicComponent(dropdownItems);
  }

  showAddTopicComponent = dropdownItems =>{
    if(dropdownItems.length !== 0){
      let dropdownValue = `${dropdownItems[0].topic_id} - ${dropdownItems[0].name}`
      let resourceValue = dropdownItems[0].topic_id
  
      this.setState({
        dropdownItems: dropdownItems,
        resourceValue: resourceValue,
        dropdownValue: dropdownValue
      })
    }else{
      this.setState({
        dropdownItems : []
      })
    }
  }

  handleDropdown = (event, item) => {
    event.preventDefault()

    this.setState({
      resourceValue: item.topic_id,
      dropdownValue: `${item.topic_id} - ${item.name}`
    })
  }

  handleInputsValues = event => {
    let component = event.target
    let itemValues = {
      [component.name + 'Value']: component.value,
      [component.name + 'Title']: 'Please fill out this field'
    }

    if (component.value) itemValues[component.name + 'Title'] = ''

    this.setState(itemValues)
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
      this.saveNewResource()
    }
  }

  saveNewResource = async () => {
    let body = {
      description: this.state.descriptionValue,
      url: this.state.urlValue,
      topic: {
        topic_id: this.state.resourceValue
      }
    }

    await util.FetchResource.save(body)

    this.cleanInputsValues()
    this.props.updateTableContent()
  }

  cleanInputsValues = () => {
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
    const {dropdownItems} = this.state

    if(dropdownItems !== null){
      if(dropdownItems.length === 0) return <ResourceError />

      return (
        <AddResourceUI
          {...this.state}
          handleInputsValues={this.handleInputsValues}
          handleDropdown={this.handleDropdown}
          handleSaveButton={this.handleSaveButton}
        />
      )
    }

    return null;
  }
}

export default AddResource
