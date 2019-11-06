import React from 'react'
import Util from '../../Util/Util'
import ls from 'local-storage'

import ResourceSelector from '../../Components/Selectors/Resource'

import './style.css'

class MyResources extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      tableData: [],
      crudStatus: 'ADD',
      selectedItem: undefined
    }
  }

  componentDidMount = async () => {
    await this.getResources()
  }

  getResources = async () => {
    let access_token = ls.get('login_token')
    let tableData = await Util.FetchResource.getAll(access_token)

    this.setState({
      tableData: tableData
    })
  }

  handleDeleteButton = async (event, resource_id) => {
    event.preventDefault()
    let access_token = ls.get('login_token')

    let isConfirmed = prompt(
      'Are you sure you want to delete this topic?[Yes/y]'
    )

    if (isConfirmed === null) {
      return
    } else if (
      isConfirmed.toLowerCase() === 'yes' ||
      isConfirmed.toLowerCase() === 'y'
    ) {
      await Util.FetchResource.delete(access_token, resource_id)

      this.closeEditContainer()
    }
  }

  handleEditButton = (event, item) => {
    event.preventDefault()
    this.setState({
      selectedItem: item,
      crudStatus: 'EDIT'
    })
  }

  //This function will allow the edit resource component to close itself
  closeEditContainer = async () => {
    await this.getResources()

    this.setState({
      crudStatus: 'ADD'
    })
  }

  render() {
    if (ls.get('login_token') === null) {
      document.location = '/'
    }

    return (
      <section className='my_resources_container'>
        <ResourceSelector
          closeEditContainer={this.closeEditContainer}
          selectedItem={this.state.selectedItem}
          status={this.state.crudStatus}
        />
        <div>
          <h1>My Resources</h1>
          <div className='mr_table_container overflow-auto'>
            <table className='table table-striped'>
              <thead className='thead-dark'>
                <tr>
                  <th scope='column'>Id</th>
                  <th scope='column'>Url</th>
                  <th scope='column'>Topic</th>
                  <th scope='column'>Description Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <GenerateTableContent
                  tableData={this.state.tableData}
                  handleDeleteButton={this.handleDeleteButton}
                  handleEditButton={this.handleEditButton}
                />
              </tbody>
            </table>
          </div>
        </div>
      </section>
    )
  }
}

//This function generates the table for MyResource component
function GenerateTableContent(props) {
  let tableContent = props.tableData.map((item, index) => {
    return (
      <tr key={index}>
        <th>{item.resource_id}</th>
        <th>
          <a href={item.url}>{item.url}</a>
        </th>
        <th>{`${item.topic.topic_id}-${item.topic.name}`}</th>
        <th>{item.description}</th>
        <th>
          <div>
            <button
              onClick={event => props.handleEditButton(event, item)}
              className='btn btn-info'
            >
              Edit
            </button>
            <button
              onClick={event =>
                props.handleDeleteButton(event, item.resource_id)
              }
              className='btn btn-danger'
            >
              Delete
            </button>
          </div>
        </th>
      </tr>
    )
  })

  return tableContent
}

export default MyResources
