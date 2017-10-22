import PropTypes from 'prop-types';
import React from 'react';

import { NavLink as Link, BrowserRouter as Router, Route, withRouter } from 'react-router-dom';
import { browserHistory } from 'react-router';

import Navbar from './navbar/navbar';
import Home from './home/home';
import Signup from './auth/signup';
import Signin from './auth/signin';
import New_Stock from './stock/new';
import Reroute from './reroute/reroute';
import Footer from './footer/footer';
import Stock from './stock/stock';
import App from './app/app';
import Ledger from './ledger/ledger';

export default class Index extends React.Component {

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
                   assets: this.props.assets,
                   ledger: this.props.ledger,
                   current_user: '',
                   message: false,
                   message_type: '',
                   message_text: ''
                 };

    this.updateSignedIn = this.updateSignedIn.bind(this);
    this.updateMessage = this.updateMessage.bind(this);
    this.updateAssets = this.updateAssets.bind(this);
  }

  updateSignedIn(signed_in, message_type, message_text){
    if(message_type){
        this.setState({signed_in: signed_in, message:true, message_type: message_type, message_text:message_text});
        setTimeout(()=> {
            this.setState({message:false, message_type: '', message_text:''})
        }, 10);
    } else {
        this.setState({signed_in: true})
    }
  }

  updateMessage(message_type, message_text){
      this.setState({message:true, message_type:message_type, message_text:message_text})
      setTimeout(()=>{
        this.setState({message:false, message_type: '', message_text: ''})
      },10)
  }

  updateAssets(assets, ledger){
      this.setState({assets:assets, ledger:ledger})
  }
  


  render() {
    return (
        <Router> 
            <App>
                <div className="App">
                    <Navbar signed_in={this.state.signed_in} updateSignedIn={this.updateSignedIn} /> 
                    <Route exact path='/' render={(props) => (
                        <Home signed_in={this.state.signed_in} assets={this.state.assets} ledger={this.state.ledger} message={this.state.message} message_text={this.state.message_text} message_type={this.state.message_type} updateAssets={this.updateAssets}  />
                    )}/>
                    <Route exact path='/signup' render={(props) => (
                        <Signup updateSignedIn={this.updateSignedIn}  />
                    )}/>
                    <Route exact path='/signin' render={(props) => (
                        <Signin updateSignedIn={this.updateSignedIn}  />
                    )}/>
                    <Route exact path='/stock' render={(props) => (
                        <New_Stock updateMessage={this.updateMessage} />
                    )}/>
                    <Route exact path='/ledger' render={(props) => (
                        <Ledger updateMessage={this.updateMessage} updateAssets={this.updateAssets} />
                    )}/>
                    <Route exact path='/reroute' render={(props) => (
                        <Reroute  />
                    )}/>
                    <Route exact path='/stock/:stock' render={(props)=>(
                        <Stock updateMessage={this.updateMessage} />
                    )}/>
                    <Footer signed_in={this.state.signed_in}/>
                </div>
            </App>
    </Router>
    );
  }
}