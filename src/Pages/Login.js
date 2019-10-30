import React from 'react';
import { Link } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import ls from 'local-storage';

import util from '../Util/Util';

import './Styles/SignAndLogin.css';

class Login extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            passwordValue : "",
            emailValue : "",
            emailValueTitle : "Please fill out this field",
            passwordValueTitle : "Please fill out this field"
        };
    }

    //This function handles the password and email values with states
    handleInputs = (event)=>{
        let item = event.target;

        if(util.Compare.isAnEmptyString(item.value)){
            this.setState({
                [item.name] : item.value,
                [item.name+"Title"] : "Please fill out this field"
            });
        }else{
            this.setState({
                [item.name] : item.value,
                [item.name+"Title"] : ""
            });
        }
    }

    //TODO: Implement Facebook Login
    handleFacebookLogin = (response)=>{
        console.log(response)
    }

    //This function will alert the user if the inputs are empty
    handleLoginButton =(event)=>{
        event.preventDefault();

        let objectCollection = [
            this.state.passwordValue,
            this.state.emailValue
        ];

        let alerts = util.Alerts;

        if(!alerts.alertIfObjectsAreEmpty(objectCollection) && alerts.alertIfIsNotAnEmail(this.state.emailValue)){
            this.login();
        }
    }

    login = ()=>{
        let url = "http://localhost:8080/login"
        let body = {
            email : this.state.emailValue,
            password : this.state.passwordValue
        };
        let params = {
            method : 'POST',
            headers : {
                'Content-Type':"application/json"
            },
            body : JSON.stringify(body)
        };

        fetch(url,params)
        .then((res)=>res.json())
        .then((res)=>{
            if(res.Authorization){
                ls.set('login_token',res.Authorization);
                document.location = "/";
                return;
            }
            alert("An error has ocurred, please try again");
            
        })
        .catch((err)=>{
            alert("An error has ocurred, please check your email or password fields");
            console.log("An error has ocurred: " + err);
        });
    }

    render(){
        return (
            <section className="sl_container">
                <div>
                    <FacebookLogin
                        id="facebook_login_button"
                        appId="2627135220683277"
                        fields="name,email,picture"
                        callback={this.handleFacebookLogin}
                        render={renderProps=>(
                            <button 
                                className="btn btn-lg btn-block facebook_login_button"
                                onClick={renderProps.onClick}>
                                Login with Facebook
                            </button>
                        )}/>
                </div>

                <form>
                    <input 
                        onChange={this.handleInputs}
                        value={this.state.emailValue} 
                        name="emailValue"
                        className="form-control" 
                        type="email" 
                        title={this.state.emailValueTitle}
                        placeholder="Email"/>
                    <input 
                        onChange={this.handleInputs}
                        value={this.state.passwordValue}
                        name="passwordValue"
                        className="form-control" 
                        type="password" 
                        title={this.state.passwordValueTitle}
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