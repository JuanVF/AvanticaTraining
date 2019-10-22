import React from 'react';
import { Link } from 'react-router-dom';

import './Styles/SignAndLogin.css';

class SignUp extends React.Component {
    render() {
        return (
            <section className="sl_container">
                <div>
                    <button className="btn btn-lg btn-block">Sign up with Facebook</button>
                </div>
                <form>
                    <p className="h5">Sign up with your email address</p>
                    <input className="form-control" type="email" placeholder="Email" />
                    <input className="form-control" type="password" placeholder="password" />
                    <input className="form-control" type="text" placeholder="Name" />
                    <button className="btn btn-success">Sign Up</button>
                </form>
                <p>Already have an account? <Link to="/login">Log in</Link></p>
            </section>
        );
    }
}

export default SignUp;