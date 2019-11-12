import React, { useState, useEffect } from 'react'
import Util from '../../Util/Util'

import { HomeUI } from './ui'

import './style.css'

export const Home = props => {
  const [tableData, setTableData] = useState([])
  useEffect(function() {
    getTableData(setTableData)
  }, [])

  return <HomeUI tableData={tableData} />
}

async function getTableData(setTableData){
  let tableData = await Util.FetchResource.getAll()
  if (tableData !== undefined) {
    tableData = Util.ParseData.parseHomeData(tableData)

    setTableData(tableData)
  }
}
