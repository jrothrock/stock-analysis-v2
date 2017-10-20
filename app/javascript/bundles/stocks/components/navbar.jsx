import PropTypes from 'prop-types';
import React from 'react';

import { NavLink as Link } from 'react-router-dom';

export default class Navbar extends React.Component {
//   static propTypes = {
//     current_user: PropTypes.string.isRequired, // this is passed from the Rails view
//   };

  /**
   * @param props - Comes from your rails view.
   */
  constructor(props) {
    super(props);

    // How to set initial state in ES6 class syntax
    // https://facebook.github.io/react/docs/reusable-components.html#es6-classes
    this.state = { current_user: this.props.current_user };
  }

  render() {
    return (
        <nav>
            <div className="nav-wrapper">
            <Link to="/" className='brand-logo' activeClassName="active">Home</Link>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><Link to="/signup" activeClassName="active">Sign Up</Link></li>
                <li><Link to="/signin" activeClassName="active">Sign In</Link></li>
            </ul>
            </div>
        </nav>
    );
  }
}
