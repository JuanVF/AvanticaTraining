import React from 'react';
import { Link } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

import util from '../Util/Util';

import './Styles/SignAndLogin.css';

class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            emailValue: "",
            passwordValue: "",
            nameValue: "",
            emailValueTitle: "Please fill out this field",
            passwordValueTitle: "Please fill out this field",
            nameValueTitle: "Please fill out this field",
        };
    }

    //This function sets the state values for the inputs
    handleInputs = (event) => {
        let item = event.target;

        if (util.Compare.isAnEmptyString(item.value)) {
            this.setState({
                [item.name]: item.value,
                [item.name + "Title"]: "Please fill out this field"
            });
        } else {
            this.setState({
                [item.name]: item.value,
                [item.name + "Title"]: ""
            });
        }
    }

    //TODO: Implement Facebook login
    handleFacebookSignup = (res) => {
        console.log(res);
    }

    //This function alerts the user to fill the empty inputs
    //TODO: fetch the API to save the user data
    handleSignup = (event) => {
        event.preventDefault();

        let objectCollection = [
            this.state.emailValue,
            this.state.passwordValue,
            this.state.nameValue
        ];

        let alerts = util.Alerts;

        if (!alerts.alertIfObjectsAreEmpty(objectCollection) && alerts.alertIfIsNotAnEmail(this.state.emailValue)) {
            this.signUp();
        }
    }

    signUp = ()=>{
        let url = "http://localhost:8080/signup";
        let body = {
            email : this.state.emailValue,
            password : this.state.passwordValue,
            name : this.state.nameValue
        };

        fetch(url,{
            method : 'POST',
            headers : {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(body)
        })
        .then((res)=>{
            if(res.status === 200){
                alert("User was registered!")
                document.location = "/";
            }
        })
        .catch((err)=>console.log(err));
    }

    render() {
        let state = this.state;

        return (
            <section className="sl_container">
                <div>
                    <FacebookLogin
                        id="facebook_login_button"
                        appId="2627135220683277"
                        fields="name,email,picture"
                        callback={this.handleFacebookSignup}
                        render={renderProps => (
                            <button
                                className="btn btn-lg btn-block facebook_login_button"
                                onClick={renderProps.onClick}>
                                Sign up with Facebook
                            </button>
                        )} />
                </div>

                <form>
                    <p className="h5">Sign up with your email address</p>
                    <input
                        value={state.emailValue}
                        onChange={this.handleInputs}
                        name="emailValue"
                        className="form-control"
                        type="email"
                        title={state.emailValueTitle}
                        placeholder="Email" />
                    <input
                        value={state.passwordValue}
                        onChange={this.handleInputs}
                        name="passwordValue"
                        className="form-control"
                        type="password"
                        title={state.passwordValueTitle}
                        placeholder="password" />
                    <input
                        value={state.nameValue}
                        onChange={this.handleInputs}
                        name="nameValue"
                        className="form-control"
                        type="text"
                        title={state.nameValueTitle}
                        placeholder="Name" />

                    <button onClick={this.handleSignup} className="btn btn-success">Sign Up</button>
                </form>

                <p>Already have an account? <Link to="/training/login">Log in</Link></p>
            </section>
        );
    }
}

export default SignUp;