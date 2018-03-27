import PropTypes from 'prop-types';
import React from 'react';
import {withRouter } from 'react-router-dom';

class About extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {};
  }


  render() {
    return (
      <div className='about-container' id='about'>
          <h5 className='center'>About</h5>
          <div className='stock-analysis-reason-text'>
            <p>The idea of this is to start out with $10,000, and invest the initial amount into various stocks.</p>
            <p>Stocks can be sold, and a 'Cash' account will be created which will be deducted at the next purchase.</p>
            <p> If no cash account exists, or doesn't have enough to cover the trade, then the starting amount and total assets will be increased.</p>
            <p> Numbers are updated every hour.</p>
          </div>
    </div>
    );
  }
}

export default withRouter(About);