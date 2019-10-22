import React from 'react';
import { Link } from 'react-router-dom';

import './Styles/SignAndLogin.css';

class Login extends React.Component{
    render(){
        return (
            <section className="sl_container">
                <div>
                    <button className="btn btn-lg btn-block">Log in with Facebook</button>
                </div>
                <form>
                    <input className="form-control" type="email" placeholder="Email"/>
                    <input className="form-control" type="password" placeholder="Password"/>
                    <button className="btn btn-success">Log in</button>
                </form>
                <p>Don't have an account?<Link to="/signup">Sign up</Link></p>
            </section>
        );
    }
}

export default Login;