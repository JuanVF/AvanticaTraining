import React, { useState, useEffect } from 'react'
import Util from '../../Util/Util'

import { HomeUI } from './ui'
import { act } from 'react-dom/test-utils'

export const Home = () => {
	const [tableData, setTableData] = useState([])
	useEffect(function() {
		getTableData(setTableData)
	}, [])

	return <HomeUI tableData={tableData} />
}

export async function getTableData(setTableData) {
	let tableData = await Util.FetchResource.getAll()
	if (tableData !== undefined || tableData !== null) {
		tableData = Util.ParseData.parseHomeData(tableData)
	
		act(() => setTableData(tableData))
	}

	return tableData
}
