import React from 'react'

import ResourceSelector from '../../Components/Selectors/Resource'
if (process.env.NODE_ENV !== 'test') require('./style.css')

export const MyResourcesUI = props => (
	<section className='my_resources_container'>
		<ResourceSelector
			closeEditComponent={props.closeEditComponent}
			selectedItem={props.selectedItem}
			status={props.crudStatus}
		/>
		<div>
			<h1 className='mr_title'>My Resources</h1>
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

const GenerateTableContent = ({
	tableData,
	openEditComponent,
	handleDeleteButton
}) => {
	if (tableData === undefined || tableData === null) return null
	let tableContent = tableData.map((item, index) => {
		return (
			<tr key={index}>
				<td>{item.resource_id}</td>
				<td>
					<a href={item.url}>{item.url}</a>
				</td>
				<td>{`${item.topic.topic_id}-${item.topic.name}`}</td>
				<td>{item.description}</td>
				<td>
					<div>
						<button
							onClick={event => openEditComponent(event, item)}
							className='btn btn-info'>
							Edit
						</button>
						<button
							onClick={event =>
								handleDeleteButton(event, item.resource_id)
							}
							className='btn btn-danger'>
							Delete
						</button>
					</div>
				</td>
			</tr>
		)
	})

	return tableContent
}
