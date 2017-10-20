import PropTypes from 'prop-types';
import React from 'react';
import {withRouter } from 'react-router-dom';
import { NavLink as Link } from 'react-router-dom';

class Navbar extends React.Component {

  constructor(props) {
    super(props);

    let signed_in_value = localStorage.getItem("_stock_analysis_session") ? true : false;
    this.state = { current_user: this.props.current_user,
                   signed_in: signed_in_value };
   this.updateSignedIn = this.props.updateSignedIn;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ signed_in: nextProps.signed_in });  
  }

  signOut(e){
      e.preventDefault();
      this.updateSignedIn(false, 'info', 'Successfully Logged Out');
      // this unforunately has to be done, or else the children components won't notice the state change.
      // same shit happened in Angular 2 too. Then they fixed it.
      this.props.history.push('/reroute');
      localStorage.removeItem("_stock_analysis_session");
  }

  render() {
    let links;
    if(this.state.signed_in){
        links = (<ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><Link to="/stock" activeClassName="active">Add Stock</Link></li>
                    <li><a href="#" className="active" onClick={(e) => this.signOut(e)}>Sign Out</a></li>
                </ul>)
    } else {
        links = (<ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><Link to="/signup" activeClassName="active">Sign Up</Link></li>
                    <li><Link to="/signin" activeClassName="active">Sign In</Link></li>
                </ul>)
    }
    return (
        <nav>
            <div className="nav-wrapper">
            <Link to="/" className='brand-logo' activeClassName="active">Home</Link>
            {links}
            </div>
        </nav>
    );
  }
}

export default withRouter(Navbar)