import React from 'react'

import TopicSelector from '../../Components/Selectors/Topic'
import Modal from '../../Components/Modal/'

export const TopicsUI = props => (
  <React.Fragment>
    <section className='topics_container'>
      <TopicSelector
        updateTableData={props.updateTableData}
        closeEditComponent={props.closeEditComponent}
        showEditComponent={props.showEditComponent}
        editItem={props.editItem}
      />
      <div>
        <h1 className="tp_title">My Topics</h1>
        <div className='tp_table_container overflow-auto'>
          <table className='table table-striped'>
            <thead className='thead-dark'>
              <tr>
                <th scope='col'>Id</th>
                <th scope='col'>Name</th>
                <th scope='col'>Actions</th>
              </tr>
            </thead>
            <tbody>
              <GenerateTableContent
                tableData={props.tableData}
                openEditComponent={props.openEditComponent}
                handleDeleteButton={props.handleDeleteButton}
              />
            </tbody>
          </table>
        </div>
      </div>
    </section>
    <Modal
      isVisible={props.isModalVisible}
      message={props.modalMessage}
    />
  </React.Fragment>
)

const GenerateTableContent = props => {
  if (props.tableData === undefined) return null

  let tableContent = props.tableData.map((item, index) => {
    return (
      <tr key={index}>
        <td>{item.topic_id}</td>
        <td>{item.name}</td>
        <td>
          <div>
            <button
              onClick={() => {
                props.openEditComponent(item)
              }}
              className='btn btn-info'
            >
              Edit
            </button>
            <button
              onClick={event => props.handleDeleteButton(event, item.topic_id)}
              className='btn btn-danger'
            >
              Delete
            </button>
          </div>
        </td>
      </tr>
    )
  })

  return tableContent
}
