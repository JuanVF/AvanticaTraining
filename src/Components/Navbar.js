import React, {useState} from 'react';

import NavbarLogged from './NavbarLogged';
import NavbarUnlogged from './NavbarUnlogged';

//This components handle which navbar to use
//Because the app has two, when is logged and unlogged
function Navbar(){
    const [isLogged, setIsLogged] = useState(true);
    if(isLogged) return <NavbarLogged handleSetLogged={setIsLogged}></NavbarLogged>

    return <NavbarUnlogged handleSetLogged={setIsLogged}></NavbarUnlogged>
}

export default Navbar;