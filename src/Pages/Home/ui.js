import React from 'react'

export const HomeUI = props => {
  let tableData = props.tableData
  if (props.tableData === undefined || props.tableData.length === 0) {
    tableData = []
  }

  return (
    <section className='container home_table_container'>
      <h2 className="home_title">Top ten topics</h2>
      <table className='table table-striped'>
        <thead className='thead-dark'>
          <tr>
            <th scope='col'>Top</th>
            <th scope='col'>Topic</th>
            <th scope='col'>Resources</th>
          </tr>
        </thead>
        <tbody>{generateTableContent(tableData)}</tbody>
      </table>
    </section>
  )
}

const generateTableContent = tableData => {
  let tableContent = tableData.map((item, index) => {
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{item.topic}</td>
        <td>{item.num_resource}</td>
      </tr>
    )
  })

  return tableContent
}
