import PropTypes from 'prop-types';
import React from 'react';
import {withRouter } from 'react-router-dom';
import { NavLink as Link } from 'react-router-dom';

class Ledger extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
                   entries: this.props.entries,
                   show_total:true,
                   show_time_ago:true
                 };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ entries: nextProps.entries });  
  }

  updateShowTotal(value){
      if(value === 'false') this.setState({show_total:false})
      else this.setState({show_total:true})
  }
  updateShowTimeAgo(value){
      if(value === 'false') this.setState({show_time_ago:false})
      else this.setState({show_time_ago:true})
  }

  showDescription(e,i){
      e.preventDefault();
      if(!$(`#${i}-ledger-show-link`).data("toggle")){
        $(`#${i}-ledger-show-link`).html("Hide <i class='fa fa-chevron-up'></i>")
        $(`#${i}-ledger-show-link`).data("toggle", true);
      } else {
        $(`#${i}-ledger-show-link`).html("Show <i class='fa fa-chevron-down'></i>")
        $(`#${i}-ledger-show-link`).data("toggle", false);
      }
      $(`#${i}-ledger-description`).slideToggle();
  }


  render() {
    let lis = [<div key="-1" className='col s12 row stock-container'><div className="col s2">Type</div><div className="col s2">Ticker</div><div className="col s2">Quantity</div><div className="col s2 select-field select-field-ledger"><select defaultValue="true" onChange={(e) => this.updateShowTotal(e.target.value)}><option value="true">Total</option><option value="false">Individual</option></select></div><div className="col s2 select-field select-field-ledger"><select defaultValue="true" onChange={(e) => this.updateShowTimeAgo(e.target.value)}><option value="true">Time Ago</option><option value="false">Date</option></select></div><div className='col s2'>Analysis</div></div>];
    if(this.state.entries){
        for(let i =0; i<this.state.entries.length; i++){
        lis.push(<div key={i} className="col s12 row stock-container" id={i+'-ledger-container'}>
            <div className="col s2">
                <div className={'btn ' + (this.state.entries[i].purchase ? 'buy-btn' : 'sell-btn')} style={{cursor:"initial"}}>
                    {this.state.entries[i].purchase ? "BUY" : "SELL"}
                </div>
            </div>
            <div className="col s2">
                <Link to={{pathname:"/stock/"+this.state.entries[i].ticker.substr(1), query:{purchase_date:this.state.entries[i].purchase_date,purchase_price:parseFloat(this.state.entries[i].purchase_price.substr(1)), sale_date: this.state.entries[i].sale_date, sale_price: parseFloat(this.state.entries[i].sale_price.substr(1)) }}} activeClassName="active">{this.state.entries[i].ticker}</Link>
            </div>
            <div className="col s2">
                {this.state.entries[i].quantity}
            </div>
            <div className="col s2">
                {this.state.show_total ? this.state.entries[i].amount : (this.state.entries[i].purchase ? this.state.entries[i].purchase_price : this.state.entries[i].sale_price)}
            </div>
            <div className="col s2">
                {this.state.show_time_ago ? this.state.entries[i].time_ago : this.state.entries[i].created_at}
            </div>
            <div className="col s2">
                <a href='#' onClick={(e)=> this.showDescription(e,i)} id={i+'-ledger-show-link'} data-toggle="false">Show <i className='fa fa-chevron-down'></i></a>
            </div>
            <div className='col s12 row stock-container-description' id={i+'-ledger-description'} style={{display:"none"}}>
                <h5 className="center" style={{marginBottom:'20px', fontSize:'1.7rem'}}>Analysis:</h5>
                <div className='col s12 row' style={{borderBottom:'1px solid rgba(255,255,255,0.2)'}}>
                    <h6 style={{fontSize:'1.45rem'}}>The Great:</h6>
                    <div>{this.state.entries[i].the_great}</div>
                </div>
                <div className='col s12 row' style={{borderBottom:'1px solid rgba(255,255,255,0.2)'}}>
                    <h6 style={{fontSize:'1.45rem'}}>The Good:</h6>
                    <div>{this.state.entries[i].the_good}</div>
                </div>
                <div className='col s12 row' style={{borderBottom:'1px solid rgba(255,255,255,0.2)'}}>
                    <h6 style={{fontSize:'1.45rem'}}>The Bad:</h6>
                    <div>{this.state.entries[i].the_bad}</div>
                </div>
                <div className='col s12 row' style={{borderBottom:'1px solid rgba(255,255,255,0.2)'}}>
                    <h6 style={{fontSize:'1.45rem'}}>The Ugly:</h6>
                    <div>{this.state.entries[i].the_ugly}</div>
                </div>
            </div>
        </div>)
        }
    }
    return (
      <div className='stocks-container' id='ledger'>
            <h5 className='center'>Ledger</h5>
            <div className='stocks-inner-container row'>
                {lis}
            </div>
        </div>
    );
  }
}

export default withRouter(Ledger);