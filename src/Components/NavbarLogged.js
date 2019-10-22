import React from 'react';

import { Link } from 'react-router-dom';

class NavbarLogged extends React.Component{
    render(){
        return(
            <nav className="navbar navbar-light bg-light">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link to="/training/top" className="navbar-brand">Avantica Training</Link>
                        <Link to="/training/topics" className="navbar-brand active">Topics</Link>
                        <Link to="/training/topics" className="navbar-brand">Resources</Link>
                    </div>
                    <ul className="d-flex justify-content-end">
                        <li className="nav-item">
                            <Link to="/training/logout" className="nav-link">Log out</Link>
                        </li> 
                    </ul>
                </div>
            </nav>
        );
    }
}

export default NavbarLogged;