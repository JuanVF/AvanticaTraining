import React from 'react';
import { Link } from 'react-router-dom';

import util from '../Util/Util';

import './Styles/SignAndLogin.css';

class SignUp extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            emailValue : "",
            passwordValue : "",
            nameValue : "",
            emailValueAlert : "Please fill out this field",
            passwordValueAlert : "Please fill out this field",
            nameValueAlert : "Please fill out this field",
        };
    }

    //This function sets the state values for the inputs
    handleInputs = (event)=>{
        let item = event.target;

        if(util.Compare.isAnEmptyString(item.value)){
            this.setState({
                [item.name] : item.value,
                [item.name+"Alert"] : "Please fill out this field"
            });
        }else{
            this.setState({
                [item.name] : item.value,
                [item.name+"Alert"] : ""
            });
        }
    }

    //TODO: Implement Facebook login
    handleFacebookSignup = (event)=>{
        event.preventDefault();
    }

    //This function alerts the user to fill the empty inputs
    //TODO: fetch the API to save the user data
    handleSignup = (event)=>{
        event.preventDefault();

        let objectCollection = [
            this.state.emailValue,
            this.state.passwordValue,
            this.state.nameValue
        ];

        let alerts = util.Alerts;

        if(!alerts.alertIfObjectsAreEmpty(objectCollection) && alerts.alertIfIsNotAnEmail(this.state.emailValue)){
            document.location = "/"
        }
    }

    render() {
        let state = this.state;

        return (
            <section className="sl_container">
                <div>
                    <button onClick={this.handleFacebookSignup} className="btn btn-lg btn-block">Sign up with Facebook</button>
                </div>

                <form>
                    <p className="h5">Sign up with your email address</p>
                    <input 
                        value={state.emailValue}
                        onChange={this.handleInputs}
                        name="emailValue"
                        className="form-control" 
                        type="email" 
                        title={state.emailValueAlert}
                        placeholder="Email" />
                    <input 
                        value={state.passwordValue}
                        onChange={this.handleInputs}
                        name="passwordValue"
                        className="form-control" 
                        type="password" 
                        title={state.passwordValueAlert}
                        placeholder="password" />
                    <input 
                        value={state.nameValue}
                        onChange={this.handleInputs}
                        name="nameValue"
                        className="form-control" 
                        type="text" 
                        title={state.nameValueAlert}
                        placeholder="Name" />

                    <button onClick={this.handleSignup} className="btn btn-success">Sign Up</button>
                </form>

                <p>Already have an account? <Link to="/training/login">Log in</Link></p>
            </section>
        );
    }
}

export default SignUp;