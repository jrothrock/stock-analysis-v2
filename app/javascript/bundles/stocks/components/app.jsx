import PropTypes from 'prop-types';
import React from 'react';

import { NavLink as Link, BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from './navbar';
import Home from './home';
import Signup from './signup';
import Signin from './signin';

export default class App extends React.Component {
//   static propTypes = {
//     name: PropTypes.string.isRequired, // this is passed from the Rails view
//   };

  /**
   * @param props - Comes from your rails view.
   */
  constructor(props) {
    super(props);

    // How to set initial state in ES6 class syntax
    // https://facebook.github.io/react/docs/reusable-components.html#es6-classes
    this.state = { name: this.props.name,
                   word: this.props.word,
                   signed_in: this.props.signed_in,
                   current_user: this.props.current_user
                 };
  }


  render() {
    console.log(this.state);
    let { stuff } = this.state
    return (
        <Router> 
            <div className="App">
                <Navbar  /> 
                <Route exact path='/' render={(props) => (
                    <Home name={this.props.name} word={this.props.word}  />
                )}/>
                <Route exact path="/signup" component={Signup}/>
                <Route exact path="/signin" component={Signin}/>
            </div>
    </Router>
    );
  }
}