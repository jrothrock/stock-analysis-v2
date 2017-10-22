import PropTypes from 'prop-types';
import React from 'react';
import {withRouter } from 'react-router-dom';
import { NavLink as Link } from 'react-router-dom';

class Assets extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
                   assets: this.props.assets,
                 };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ assets: nextProps.assets });  
  }

  render() {
    let lis = [<div key="-1" className='col s12 row stock-container'><div className="col s2">Ticker</div><div className="col s2">Quantity</div><div className="col s2">Total Spent</div><div className='col s2'>Average Paid</div><div className='col s2'>Current Value</div><div className='col s2'>Gain or Loss</div></div>];
    let keys = this.state.assets && this.state.assets.data ? Object.keys(this.state.assets.data) : [];
    for(let i =0; i< keys.length; i++){
      if(parseInt(this.state.assets.data[keys[i]]['quantity']) > 0){
        lis.push(<div key={i} className="col s12 row stock-container">
            <div className="col s2">
            <Link to={"/stock/"+keys[i].substr(1)} activeClassName="active">{keys[i]}</Link>
            </div>
            <div className="col s2">
            {this.state.assets.data[keys[i]]['quantity']}
            </div>
            <div className="col s2">
            {this.state.assets.data[keys[i]]['total']}
            </div>
            <div className='col s2'>
            {this.state.assets.data[keys[i]]['purchase_average']}
            </div>
            <div className='col s2'>
            {this.state.assets.data[keys[i]]['current']}
            </div>
            <div className='col s2'>
            {parseFloat(this.state.assets.data[keys[i]]['current'].substr(1))-(parseFloat(this.state.assets.data[keys[i]]['purchase_average'].substr(1))*parseFloat(this.state.assets.data[keys[i]]['quantity']))}
            </div>
        </div>)
      } else if(keys[i] === 'Cash' && parseFloat(this.state.assets.data[keys[i]].substr(1)) > 0){
          lis.push(<div key={i} className="col s12 row stock-container">
              <div className="col s2">
                  {keys[i]}
              </div>
              <div className="col s2">
              </div>
              <div className="col s2">
              </div>
              <div className="col s2">
              </div>
              <div className="col s2">
                  {this.state.assets.data[keys[i]]}
              </div>
           </div>)
      }
    }
    return (
     <div className='stocks-container' id='current'>
          <h5 className='center'>Current Assets</h5>
          <div className='stocks-inner-container row'>
            {lis}
          </div>
        </div>
    );
  }
}

export default withRouter(Assets);