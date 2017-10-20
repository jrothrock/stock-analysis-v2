import PropTypes from 'prop-types';
import React from 'react';

import { NavLink as Link, BrowserRouter as Router, Route, withRouter } from 'react-router-dom';
import { browserHistory } from 'react-router';

import Navbar from './navbar';
import Home from './home';
import Signup from './signup';
import Signin from './signin';
import Stock from './stock';
import Reroute from './reroute';

export default class App extends React.Component {

  static contextTypes: {
    router: React.PropTypes.object
  };

  /**
   * @param props - Comes from your rails view.
   */
  constructor(props) {
    super(props);

    this.state = {
                   signed_in: this.props.signed_in,
                   current_user: this.props.current_user,
                   message: false,
                   message_type: '',
                   message_text: ''
                 };

    this.updateSignedIn = this.updateSignedIn.bind(this)
    this.updateMessage = this.updateMessage.bind(this)
                 
  }
//   componentDidMount(){
//     console.log(localStorage.getItem("_stock_analysis_session"))
//     if(localStorage.getItem("_stock_analysis_session")) this.setState({signed_in : true});
//     else this.setState({signed_in : false});
//     this.state.signed_in = true;
//     console.log(this.state);
//   }

  updateSignedIn(signed_in, message_type, message_text){
    this.setState({signed_in: signed_in, message:true, message_type: message_type, message_text:message_text});
    setTimeout(()=> {
        this.setState({message:false, message_type: '', message_text:''})
    }, 10);
  }

  updateMessage(message_type, message_text){
      this.setState({message:true, message_type:message_type, message_text:message_text})
      setTimeout(()=>{
        this.setState({message:false, message_type: '', message_text: ''})
      },10)
  }
  


  render() {
    return (
        <Router> 
            <div className="App">
                <Navbar signed_in={this.state.signed_in} updateSignedIn={this.updateSignedIn} /> 
                <Route exact path='/' render={(props) => (
                    <Home signed_in={this.state.signed_in} message={this.state.message} message_text={this.state.message_text} message_type={this.state.message_type}  />
                )}/>
                <Route exact path='/signup' render={(props) => (
                    <Signup updateSignedIn={this.updateSignedIn}  />
                )}/>
                <Route exact path='/signin' render={(props) => (
                    <Signin updateSignedIn={this.updateSignedIn}  />
                )}/>
                <Route exact path='/stock' render={(props) => (
                    <Stock updateMessage={this.updateMessage} />
                )}/>
                <Route exact path='/reroute' render={(props) => (
                    <Reroute  />
                )}/>
            </div>
    </Router>
    );
  }
}