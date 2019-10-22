import React from 'react';
import { Link } from 'react-router-dom';

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
                            <Link class="nav-link" to="/login">Log in</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to="/signup">Sign up</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default NavbarLogged;