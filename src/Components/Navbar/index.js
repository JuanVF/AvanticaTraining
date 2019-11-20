import React from 'react'
import ls from 'local-storage'

import NavbarLogged from './NavbarLogged'
import NavbarUnlogged from './NavbarUnlogged'

//This components handle which navbar to use
//Because the app has two, when is logged and unlogged
function Navbar(props) {
	if (ls.get('login_token')) return <NavbarLogged />

	return <NavbarUnlogged />
}

export default Navbar
