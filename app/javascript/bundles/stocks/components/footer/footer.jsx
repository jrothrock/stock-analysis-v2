import PropTypes from 'prop-types';
import React from 'react';
import {withRouter } from 'react-router-dom';
import { NavLink as Link } from 'react-router-dom';

class Footer extends React.Component {

  constructor(props) {
    super(props);

    let signed_in_value = localStorage.getItem("_stock_analysis_session") ? true : false;
    let year = (new Date()).getFullYear()
    this.state = { current_user: this.props.current_user,
                   signed_in: signed_in_value,
                   year: year };
   this.updateSignedIn = this.props.updateSignedIn;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ signed_in: nextProps.signed_in });  
  }
  

  render() {
    let links = (<ul><li><Link to="/signin" className="grey-text text-lighten-3" style={{color:'grey !important'}}>Sign In</Link></li>
                  <li><Link to="/signup" className="grey-text text-lighten-3" style={{color:'grey !important'}}>Sign Up</Link></li></ul>);
    if(this.state.signed_in){
      links = (<ul><li><Link to="/ledger" className="grey-text text-lighten-3">Update Ledger</Link></li></ul>)
    }
    return (
        <footer className="page-footer">
          <div className="container">
            <div className="row">
              <div className="col l6 s12">
                <h5 className="white-text">Stock Analysis V2</h5>
                <p className="grey-text text-lighten-4">This is a continuous work in progress. Features will be added over time.</p>
                <p className="grey-text text-lighten-4">* ROI is simple, and is not being discounted.</p>
              </div>
              <div className="col l4 offset-l2 s12">
                <h5 className="white-text">Links</h5>
                {links}
              </div>
            </div>
          </div>
          <div className="footer-copyright">
            <div className="container">
            © {this.state.year} All Rights Reserved. <a className="grey-text text-lighten-4" href='https://jackrothrock.com'>Jack Rothrock.</a>
                <div className="grey-text text-lighten-4 right footer-social-icons">
                    <a href="https://jackrothrock.com">
                        <li>
                            <i className='fa fa-globe'></i>
                        </li>
                    </a>
                    <a href="https://github.com/jrothrock/stock-analysis-v2">
                        <li>
                            <i className='fa fa-github'></i>
                        </li>
                    </a>
                </div>
            </div>
          </div>
        </footer>
    );
  }
}

export default withRouter(Footer)