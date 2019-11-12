import React from 'react'
import Util from '../../Util/Util'
import ls from 'local-storage'

import { MyResourcesUI } from './ui'

import './style.css'

class MyResources extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      tableData: [],
      crudStatus: 'ADD',
      selectedItem: undefined,
      isAValidToken : null
    }
  }

  componentDidMount(){
    this.handleExpiredToken()
  }

  handleExpiredToken = async ()=>{
    const isAValidToken = await Util.VerifyToken.isAValidToken();

    if(isAValidToken){
      this.setState({
        isAValidToken : isAValidToken
      });
      await this.getResourcesItems()
    }else{
      alert('Your session expired. Please login')
      this.setState({
        isAValidToken : isAValidToken
      });
      ls.remove('login_token')
    }
  }

  getResourcesItems = async () => {
    let tableData = await Util.FetchResource.getAll()

    this.setState({
      tableData: tableData
    })
  }

  handleDeleteButton = async (event, resource_id) => {
    event.preventDefault()

    let wantToDeleteItem = prompt(
      'Are you sure you want to delete this topic?[Yes/y]'
    )

    if (wantToDeleteItem === null) return

    wantToDeleteItem = wantToDeleteItem.toLowerCase()

    if (wantToDeleteItem === 'yes' || wantToDeleteItem === 'y') {
      await Util.FetchResource.delete(resource_id)

      this.closeEditComponent()
    }
  }

  openEditComponent = (event, item) => {
    event.preventDefault()
    this.setState({
      selectedItem: item,
      crudStatus: 'EDIT'
    })
  }

  closeEditComponent = async () => {
    await this.getResourcesItems()

    this.setState({
      crudStatus: 'ADD'
    })
  }
  

  render(){    
    if(this.state.isAValidToken === null) return null

    if(!this.state.isAValidToken) document.location = '/'

    return (
      <MyResourcesUI
        {...this.state}
        closeEditComponent={this.closeEditComponent}
        handleDeleteButton={this.handleDeleteButton}
        openEditComponent={this.openEditComponent}
      />
    )
  }
}

export default MyResources
