import React from 'react';

import './Styles/Navbar.css';

class NavbarLogged extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-light bg-light">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a href="/" className="navbar-brand active">Avantica Training</a>
                    </div>
                    <ul class="d-flex justify-content-end">
                        <li class="nav-item">
                            <a class="nav-link" href="#">Log in</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Sign</a>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default NavbarLogged;