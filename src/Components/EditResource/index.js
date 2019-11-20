import React from 'react'
import util from '../../Util/Util'

import { EditResourceUI } from './ui'

class EditResources extends React.Component {
	constructor(props) {
		super(props)

		const { resource_id, description, topic, url } = props.selectedItem

		const componentsValues = {
			resourceIdValue: resource_id,
			descriptionValue: description,
			topicIdValue: topic.topic_id,
			urlValue: url,
			dropdownValue: `${topic.topic_id} - ${topic.name}`
		}

		const componentsTitles = {
			descriptionTitle: '',
			urlTitle: ''
		}

		this.state = {
			...componentsValues,
			...componentsTitles,
			modalMessage: '',
			dropdownItems: [],
			isModalVisible: false
		}
	}

	componentDidMount = async () => {
		let data = await util.FetchTopic.getTopics()
		this.setState({
			dropdownItems: data
		})
	}

	//In this case this will update the selected Item data
	componentDidUpdate(prevProps) {
		let prevResourceId = prevProps.selectedItem.resource_id
		let nextResourceId = this.props.selectedItem.resource_id

		if (prevResourceId !== nextResourceId) {
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

	//This function will check when a new prop is passed
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
			topicIdValue: item.topic_id,
			dropdownValue: `${item.topic_id} - ${item.name}`
		})
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

	handleSaveButton = async event => {
		event.preventDefault()

		let objectCollection = [
			this.state.urlValue,
			this.state.descriptionValue
		]

		if (
			!util.Alerts.alertIfObjectsAreEmpty(
				objectCollection,
				this.toggleModal
			)
		) {
			this.updateResource()
		}
	}

	updateResource = async () => {
		let body = {
			resource_id: this.state.resourceIdValue,
			description: this.state.descriptionValue,
			url: this.state.urlValue,
			topic: {
				topic_id: this.state.topicIdValue
			}
		}

		await util.FetchResource.update(body)

		this.props.closeEditComponent()
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
			<EditResourceUI
				{...this.state}
				handleInputValues={this.handleInputValues}
				handleDropdownMenu={this.handleDropdownMenu}
				handleSaveButton={this.handleSaveButton}
				closeEditComponent={this.props.closeEditComponent}
			/>
		)
	}
}

export default EditResources
