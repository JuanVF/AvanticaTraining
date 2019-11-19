import React, { useState, useEffect } from 'react'
import Util from '../../Util/Util'

import { HomeUI } from './ui'

export const Home = () => {
  const [tableData, setTableData] = useState([])
  useEffect(function() {
    getTableData(setTableData)
  }, [])

  return <HomeUI tableData={tableData} />
}

export async function getTableData(setTableData){
  let tableData = await Util.FetchResource.getAll()
  if (tableData !== undefined) {
    tableData = Util.ParseData.parseHomeData(tableData)

    setTableData(tableData)
  }

  return tableData
}
