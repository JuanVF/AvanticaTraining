import React from 'react';
import ls from 'local-storage'

import NavbarLogged from './NavbarLogged';
import NavbarUnlogged from './NavbarUnlogged';

//This components handle which navbar to use
//Because the app has two, when is logged and unlogged
function Navbar(){
    if(ls.get('login_token')) return <NavbarLogged></NavbarLogged>

    return <NavbarUnlogged></NavbarUnlogged>
}

export default Navbar;