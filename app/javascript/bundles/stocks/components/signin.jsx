import PropTypes from 'prop-types';
import React from 'react';

export default class Signin extends React.Component {
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
    this.state = { name: this.props.name,
                   word: this.props.word
                 };
  }


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
                        <form>
                            <div className="panel-body">
                                <div className="input-field">
                                    <input className='input-lg' type='text' autoFocus='true' id='email' required />
                                    <label htmlFor="email">Email</label>
                                </div>
                                <div className="input-field">
                                    <input className='input-lg' type='password' id='password' required />
                                    <label htmlFor="passwor">Password</label>
                                </div>
                                <div className="input-field">
                                    <button type='submit' className='waves-effect waves-light btn'>Log in</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
  }
}