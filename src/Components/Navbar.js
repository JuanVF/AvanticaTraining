import React from 'react';

import NavbarLogged from './NavbarLogged';
import NavbarUnlogged from './NavbarUnlogged';

function Navbar(){
    let isLogged = true;
    if(isLogged) return <NavbarLogged></NavbarLogged>

    return <NavbarUnlogged></NavbarUnlogged>
}

export default Navbar;