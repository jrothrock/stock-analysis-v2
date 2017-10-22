import PropTypes from 'prop-types';
import React from 'react';
import {withRouter } from 'react-router-dom';
import { NavLink as Link } from 'react-router-dom';

class Navbar extends React.Component {

  constructor(props) {
    super(props);

    let signed_in_value = localStorage.getItem("_stock_analysis_session") ? true : false;
    // this has to be done due to the fact if someone vists the site, and they have a token, the state won't be set in the index. This sets it.
    // that's why there the if for the setting of the state in the index.js
    if(signed_in_value && !this.props.signed_in){
        this.props.updateSignedIn(true,false);
    }
    this.state = { current_user: this.props.current_user,
                   signed_in: signed_in_value };
   this.updateSignedIn = this.props.updateSignedIn;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ signed_in: nextProps.signed_in });  
  }

  signOut(e){
      e.preventDefault();
      $.ajax({
        url: `${location.origin}/api/v1/auth/signout`,
        headers: { 'Authorization': `Bearer ${localStorage.getItem("_stock_analysis_session")}` },
        data: {},
        type: 'POST',
        success: (data) => {
            this.updateSignedIn(false, 'info', 'Successfully Logged Out');
            // this unforunately has to be done, or else the children components won't notice the state change.
            // same shit happened in Angular 2 too. Then they fixed it.
            this.props.history.push('/reroute');
            localStorage.removeItem("_stock_analysis_session");
            localStorage.removeItem("_stock_analysis_username");
        },
        error: (error) =>{
            console.log(error);
            // well something failed... Still need to remove everything
            this.updateSignedIn(false, 'info', 'Successfully Logged Out');
            this.props.history.push('/reroute');
            localStorage.removeItem("_stock_analysis_session");
            localStorage.removeItem("_stock_analysis_username");
        }
      });
  }

  render() {
    let links;
    if(this.state.signed_in){
        links = (<div id="nav-mobile">
                    <li><Link to="/ledger">Update Ledger</Link></li>
                    <li><a href="#" onClick={(e) => this.signOut(e)}>Sign Out</a></li>
                </div>)
    } else {
        links = (<div>
                    <li><Link to="/signup">Sign Up</Link></li>
                    <li><Link to="/signin">Sign In</Link></li>
                </div>)
    }
    setTimeout(function() {
        $('.button-collapse').sideNav({
        menuWidth: 250, // Default is 300
        edge: 'left', // Choose the horizontal origin
        closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
        draggable: true, // Choose whether you can drag to open on touch screens,
        onOpen: function(el) { $('#nav-menu-icon').toggleClass('open') }, // A function to be called when sideNav is opened
        onClose: function(el) { $('#nav-menu-icon').toggleClass('open') }, // A function to be called when sideNav is closed
    });
    }, 1);
    return (
        <nav>
            <div className="nav-wrapper">
            <Link to="/" className='brand-logo'>Home</Link>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
            {links}
            </ul>
            <ul className='right show-on-med-and-down'>
                <li>
                    <a href="#" data-activates="slide-out" className="button-collapse" id="nav-menu-icon">
                        <div id="nav-menu-icon">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </a>
                </li>
            </ul>
            </div>
            <ul id="slide-out" className="side-nav">
                {links}
            </ul>
        </nav>
    );
  }
}

export default withRouter(Navbar)