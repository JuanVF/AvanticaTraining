import React from 'react'

import Navbar from '../Navbar/'

//This components allow the webpage to use the same
//navbar in the whole app without copying and pasting
//the same component in all the pages
function Layout(props) {
  return (
    <React.Fragment>
      <Navbar {...props}></Navbar>
      {props.children}
    </React.Fragment>
  )
}

export default Layout
