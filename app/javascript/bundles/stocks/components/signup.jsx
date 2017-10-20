import PropTypes from 'prop-types';
import React from 'react';

export default class Signup extends React.Component {
  // static propTypes = {
  //   name: PropTypes.string.isRequired, // this is passed from the Rails view
  // };

  /**
   * @param props - Comes from your rails view.
   */
  constructor(props) {
    super(props);

    // How to set initial state in ES6 class syntax
    // https://facebook.github.io/react/docs/reusable-components.html#es6-classes
    this.state = { username: this.props.username,
                   email: this.props.email,
                   password: this.props.password,
                   password_confirmation: this.props.password_confirmation
                 };
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
        console.log('form submitted');
        console.log(this.state);
        $.ajax({
            url: `${location.origin}/signup`,
            data: {email:this.state.email,username:this.state.username,password:this.state.password,password_confirmation:this.state.password_confirmation},
            type: 'POST',
            success: function(data) {
               console.log(data);
            },
            error:function(error){
                console.log(error);
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
