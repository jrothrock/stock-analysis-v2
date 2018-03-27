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
    let lis = [<div key="-1" className='col s12 row stock-container'><div className="col smr">Ticker</div><div className="col smr">Quantity</div><div className="col smr">Total Spent</div><div className='col smr'>Current Value</div><div className='col smr'>Average Paid</div><div className='col smr'>Current Price Per Share</div><div className='col smr'>Total Gain or Loss</div><div className='col smr'>Today's Gain or Loss</div></div>];
    let keys = this.state.assets && this.state.assets.data ? Object.keys(this.state.assets.data) : []; 
    keys.sort(function(a,b){
      if(a === "Cash"){
        return 1
      } else if(b === "Cash"){
        return -1;
      }
      return 0;
    })
    console.log(keys);
    for(let i =0; i< keys.length; i++){
      let change = keys[i] != "Cash" ? parseFloat(this.state.assets.data[keys[i]]['current'].replace(',','').substr(1)-Math.round((parseFloat(this.state.assets.data[keys[i]]['purchase_average'].replace(',','').substr(1))*parseFloat(this.state.assets.data[keys[i]]['quantity']))*100)/100).toFixed(2) : 0;
      let today_change =  keys[i] != "Cash" ? parseFloat(String(this.state.assets.data[keys[i]]['today_change']).replace(',','').substr(1)) : 0
      if(parseInt(this.state.assets.data[keys[i]]['quantity']) > 0){
        lis.push(<div key={i} className="col s12 row stock-container">
            <div className="col smr">
            <Link to={"/stock/"+keys[i].substr(1)} activeClassName="active">{keys[i]}</Link>
            </div>
            <div className="col smr">
            {this.state.assets.data[keys[i]]['quantity']}
            </div>
            <div className="col smr">
            {this.state.assets.data[keys[i]]['total']}
            </div>
            <div className='col smr'>
            {this.state.assets.data[keys[i]]['current']}
            </div>
            <div className='col smr'>
            {this.state.assets.data[keys[i]]['purchase_average']}
            </div>
            <div className='col smr'>
            {this.state.assets.data[keys[i]]['current_price']}
            </div>
            <div className='col smr'>
              <span style={{color:(change >= 0 ? "#0ce212" : "#FF0000")}}>
                  ${String(change.replace(/\B(?=(\d{3})+(?!\d))/g, ","))}
              </span>
            </div>
            <div className='col smr'>
               <span style={{color:(today_change >= 0 ? "#0ce212" : "#FF0000")}}>
                  {this.state.assets.data[keys[i]]['today_change']}
                </span>
            </div>
        </div>)
      } else if(keys[i] === 'Cash' && parseFloat(this.state.assets.data[keys[i]].substr(1)) > 0){
          lis.push(<div key={i} className="col s12 row stock-container">
              <div className="col smr">
                  <span style={{color:"#0db70d"}}>
                    {keys[i]}
                  </span>
              </div>
              <div className="col smr">
                  {parseInt(this.state.assets.data[keys[i]].replace(',','').substr(1))}
              </div>
              <div className="col smr">
              </div>
              <div className="col smr">
                  {this.state.assets.data[keys[i]]}
              </div>
              <div className="col smr">
              </div>
              <div className="col smr">
              </div>
              <div className="col smr">
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