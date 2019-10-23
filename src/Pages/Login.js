import React from 'react';
import { Link } from 'react-router-dom';

import util from '../Util/Util';

import './Styles/SignAndLogin.css';

class Login extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            passwordValue : "",
            emailValue : "",
            emailValueAlert : "Please fill out this field",
            passwordValueAlert : "Please fill out this field"
        };
    }

    //This function handles the password and email values with states
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

    //TODO: Implement Facebook Login
    handleFacebookLogin = (event)=>{
        event.preventDefault();
    }

    //This function will alert the user if the inputs are empty
    //TODO: Implement login
    handleLoginButton =(event)=>{
        event.preventDefault();

        let objectCollection = [
            this.state.passwordValue,
            this.state.emailValue
        ];

        let alerts = util.Alerts;

        if(!alerts.alertIfObjectsAreEmpty(objectCollection) && alerts.alertIfIsNotAnEmail(this.state.emailValue)){
            document.location = "/"
        }
    }

    render(){
        return (
            <section className="sl_container">
                <div>
                    <button className="btn btn-lg btn-block">Log in with Facebook</button>
                </div>

                <form>
                    <input 
                        onChange={this.handleInputs}
                        value={this.state.emailValue} 
                        name="emailValue"
                        className="form-control" 
                        type="email" 
                        title={this.state.emailValueAlert}
                        placeholder="Email"/>
                    <input 
                        onChange={this.handleInputs}
                        value={this.state.passwordValue}
                        name="passwordValue"
                        className="form-control" 
                        type="password" 
                        title={this.state.passwordValueAlert}
                        placeholder="Password"/>
                    <button 
                        onClick={this.handleLoginButton}
                        className="btn btn-success">
                        Log in
                    </button>
                </form>

                <p>Don't have an account?<Link to="/training/signup">Sign up</Link></p>
            </section>
        );
    }
}

export default Login;