import PropTypes from 'prop-types';
import React from 'react';
import {withRouter } from 'react-router-dom';

class Statistics extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
                   current_assets:this.props.assets ? this.props.assets['current'] : 0,
                   roi: this.props.assets ? this.props.assets['roi'] : 0.0,
                   beginning_amount: this.props.assets ? this.props.assets['beginning'] : 0,
                   today_change: this.props.assets ? this.props.assets['today'] : 0
                 };
  }

  componentWillReceiveProps(nextProps) {
    let beginning = (nextProps.assets && nextProps.assets['beginning']) ? nextProps.assets['beginning'] : 0;
    let roi = (nextProps.assets && nextProps.assets['roi']) ? nextProps.assets['roi'] : 0.0;
    let current = (nextProps.assets && nextProps.assets['current']) ? nextProps.assets['current'] : 0;
    let today = (nextProps.assets && nextProps.assets['todays']) ? nextProps.assets['todays'] : 0;
    this.setState({ current_assets: current, roi: roi, beginning_amount: beginning,today_change:today});  
  }


  render() {
    return (
      <div>
        <div className='stats-container' id='statistics'>
          <h5 className='center'>Statistics</h5>
          <div className='stats-inner-container row col ms12'>
            <div className='stat total-assets col ms3'>
              Total Assets: <span className='stat-text'>{this.state.current_assets}</span>
            </div>
            <div className='stat roi col ms3'>
              ROI: <span className='stat-text roi-text'>{this.state.roi}%</span>
            </div>
            <div className='stat amount-traded col ms3'>
              Starting Amount: <span className='stat-text'>{this.state.beginning_amount}</span>
            </div>
            <div className='stat amount-traded col ms3'>
              Today's change: <span className='stat-text'>{this.state.today_change}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Statistics);