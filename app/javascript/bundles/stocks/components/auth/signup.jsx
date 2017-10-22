import PropTypes from 'prop-types';
import React from 'react';
import {withRouter } from 'react-router-dom';

class Signup extends React.Component {

  constructor(props) {
    super(props);

    this.state = { username: this.props.username,
                   email: this.props.email,
                   password: this.props.password,
                   password_confirmation: this.props.password_confirmation
                 };
    this.updateSignedIn = props.updateSignedIn;
  }

    updateUsername = (username) => {
        this.setState({ username });
    };
    updateEmail = (email) => {
        this.setState({ email });
    };
    updatePassword = (password) => {
        this.setState({ password });
    };
    updatePasswordConfirmation = (password_confirmation) => {
        this.setState({ password_confirmation });
    };

    submitForm = () =>{
        $.ajax({
            url: `${location.origin}/api/v1/auth/signup`,
            data: {email:this.state.email,username:this.state.username,password:this.state.password,password_confirmation:this.state.password_confirmation},
            type: 'POST',
            success: (data) => {
               localStorage.setItem("_stock_analysis_session", data.token)
               localStorage.setItem("_stock_analysis_username", data.username)
               this.updateSignedIn(true, 'info', 'Successfully Registered');
               this.props.history.push('/');
            },
            error: (error) =>{
                console.log(error);
                if(error.status === 409){
                   Materialize.toast('Username Already Exists', 3000, 'rounded-error');
                }
            }
          });
    };

  render() {
    return (
      <div className="registration-bg">
        <div className="container">
            <div className="row">
            <div className="col-md-4 col-md-offset-4">
                <div className="log-in panel">
                    <div className="panel-heading">
                        <h2>Create Your Account</h2>
                    </div>
                    <div className="panel-body">
                        <div className="input-field">
                            <input className='input-lg' type='text' name="username" autoFocus="true" onChange={(e) => this.updateUsername(e.target.value)} required/>
                            <label htmlFor='username'>Username</label>
                        </div>
                        <div className="input-field">
                            <input className='input-lg' type='email' id='email' onChange={(e) => this.updateEmail(e.target.value)} required/>
                            <label htmlFor='email'>Email</label>
                        </div>
                        <div className="input-field">
                            <input className='input-lg' type='password' id='password' onChange={(e) => this.updatePassword(e.target.value)} required/>
                            <label htmlFor='password'>Password</label>
                        </div>
                        <div className="input-field">
                            <input className='input-lg' type='password' id='password_confirmation' onChange={(e) => this.updatePasswordConfirmation(e.target.value)} required/>
                            <label htmlFor='password_confirmation'>Confirm Password</label>
                        </div>
                        <div className="input-field">
                            <button className='waves-effect waves-light btn' onClick={()=> this.submitForm()}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    </div>
    );
  }
}

export default withRouter(Signup);