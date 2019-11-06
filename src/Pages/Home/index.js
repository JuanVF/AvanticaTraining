import React, { useState, useEffect } from 'react'
import Util from '../../Util/Util'
import ls from 'local-storage'

import { HomeUI } from './ui'

import './style.css'

export const Home = () => {
  const [tableData, setTableData] = useState([])

  useEffect(function() {
    getTableData(setTableData)
  }, [])

  return <HomeUI tableData={tableData} />
}

const getTableData = async setTableData => {
  let access_token = ls.get('login_token')

  let tableData = await Util.FetchResource.getAll(access_token)
  if (tableData !== undefined) {
    tableData = Util.ParseData.parseHomeData(tableData)

    setTableData(tableData)
  }
}
