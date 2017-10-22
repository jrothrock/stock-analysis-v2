import PropTypes from 'prop-types';
import React from 'react';
import {withRouter } from 'react-router-dom';

class Signin extends React.Component {

  constructor(props) {
    super(props);

    this.state = { email: this.props.email,
                   password: this.props.password
                 };
    this.updateSignedIn = this.props.updateSignedIn;
  }


    updateUsername = (username) => {
        this.setState({ username });
    };
    updatePassword = (password) => {
        this.setState({ password });
    };

    submitForm = () =>{
        $.ajax({
            url: `${location.origin}/api/v1/auth/signin`,
            data: {username:this.state.username,password:this.state.password},
            type: 'POST',
            success: (data) => {
               localStorage.setItem("_stock_analysis_session", data.token)
               localStorage.setItem("_stock_analysis_username", data.username)
               this.updateSignedIn(true, 'info', 'Successfully Logged In');
               this.props.history.push('/');
            },
            error: (error) =>{
                if(error.status === 404){
                    Materialize.toast('The Username or Password Is Incorrect', 3000, 'rounded-error') 
                }
            }
          });
    };

  render() {
    return (
      <div className="login-bg">
        <div className="container">
            <div className="row">
                <div className="col-md-4 col-md-offset-4">
                    <div className="log-in panel">
                        <div className="panel-heading">
                            <h2>Sign in</h2>
                        </div>
                            <div className="panel-body">
                                <div className="input-field">
                                    <input className='input-lg' type='text' autoFocus='true' id='email' onChange={(e) => this.updateUsername(e.target.value)} required />
                                    <label htmlFor="email">Username</label>
                                </div>
                                <div className="input-field">
                                    <input className='input-lg' type='password' id='password' onChange={(e) => this.updatePassword(e.target.value)} required />
                                    <label htmlFor="passwor">Password</label>
                                </div>
                                <div className="input-field">
                                    <button className='waves-effect waves-light btn' onClick={()=> this.submitForm()}>Log in</button>
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
export default withRouter(Signin)