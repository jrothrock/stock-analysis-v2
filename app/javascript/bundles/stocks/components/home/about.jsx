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
            I created this to 'fake' invest in a stock every week and measure my ROI. Maybe in the future I'll add something to mark trades I actually conduct, but being a broke college student, I'll leave it as is. For now, I'll be staying away from options and ETFs.
          </div>
    </div>
    );
  }
}

export default withRouter(About);