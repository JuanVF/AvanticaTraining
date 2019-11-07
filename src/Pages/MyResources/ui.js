import React from 'react'

import ResourceSelector from '../../Components/Selectors/Resource'

export const MyResourcesUI = props => (
  <section className='my_resources_container'>
    <ResourceSelector
      closeEditComponent={props.closeEditComponent}
      selectedItem={props.selectedItem}
      status={props.crudStatus}
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
              tableData={props.tableData}
              handleDeleteButton={props.handleDeleteButton}
              openEditComponent={props.openEditComponent}
            />
          </tbody>
        </table>
      </div>
    </div>
  </section>
)

const GenerateTableContent = props => {
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
              onClick={event => props.openEditComponent(event, item)}
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
