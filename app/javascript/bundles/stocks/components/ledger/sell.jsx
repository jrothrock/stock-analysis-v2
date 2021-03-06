import PropTypes from 'prop-types';
import React from 'react';
import {withRouter} from 'react-router-dom';

class Sell extends React.Component {

  constructor(props) {
    super(props);

    this.state = { stock: '',
                   the_great: '',
                   the_good: '',
                   the_bad: '',
                   the_ugly: '',
                   quantity: 1,
                   price: 1,
                   stocks:[],
                   quantities:[],
                   noStocks:false
                 };
    this.updateMessage = props.updateMessage;
    this.updateAssets = props.updateAssets;
    this.getStocks();
  }

    updateStock = (stock) => {
        this.setState({ stock:stock });
    };
    updateTheGreat = (great) =>{
        this.setState({the_great:great})
    }
    updateTheGood = (good) =>{
        this.setState({the_good:good})
    }
    updateTheBad = (bad) =>{
        this.setState({the_bad:bad})
    }
    updateTheUgly = (ugly) =>{
        this.setState({the_ugly:ugly})
    }
    updateQuantity = (quantity) => {
        this.setState({quantity:quantity})
        $(`#lower-sell-fields`).slideDown();
    }
    updatePrice = (price) => {
        this.setState({price:price})
    }

    submitForm = () =>{
        $.ajax({
            url: `${location.origin}/api/v1/stocks/sell`,
            headers: { 'Authorization': `Bearer ${localStorage.getItem("_stock_analysis_session")}` },
            data: {ticker:this.state.stock,quantity:this.state.quantity,price:this.state.price,great:this.state.the_great,good:this.state.the_good,bad:this.state.the_bad,ugly:this.state.the_ugly},
            type: 'POST',
            success: (data) => {
                this.updateAssets(data.assets, data.ledger)
                this.updateMessage('success',`Successfully Sold ${this.state.quantity} ${this.state.stock}`)
                this.props.history.push('/');
            },
            error: (error) =>{
                console.log(error);
                Materialize.toast("Ticker Doesn't Exist", 3000, 'rounded-error');
            }
        });
    };

    getStocks = () => {
        $.ajax({
            url: `${location.origin}/api/v1/stocks/sell`,
            headers: { 'Authorization': `Bearer ${localStorage.getItem("_stock_analysis_session")}` },
            type: 'GET',
            success: (data) => {
                let keys = Object.keys(data.assets.data);
                let stocks = [];
                for(let i = 0; i < keys.length; i++){
                    if(parseInt(data.assets.data[keys[i]]['quantity']) > 0)stocks.push(keys[i])
                }
                if(stocks.length === 0){
                    this.setState({noStocks:true})
                    $(`#submit-sell-button`).attr('disabled','disabled')
                } else {
                    console.log(stocks[0]);
                    console.log(data.assets.data)
                    this.setState({stocks:stocks, quantities:[parseInt(data.assets.data[stocks[0]]['quantity'])], stock:stocks[0].substr(1), quantity:parseInt(data.assets.data[stocks[0]]['quantity'])})
                    $(`#lower-sell-fields`).slideDown();
                } 
            },
            error: (error) =>{
                console.log(error);
            }
        });
    };



render() {
    let message = (<div></div>)
    let options = [];
    for(let i = 0; i < this.state.stocks.length; i++){
        options.push((<option key={i} value={this.state.stocks[i].substr(1)}>{this.state.stocks[i].substr(1)}</option>))
    }
    let quantity_options = [];
    for(let i = 0; i < this.state.quantities[0];i++){
        quantity_options.push((<option key={i} value={i+1}>{i+1}</option>))
    }
    if(this.state.noStocks){
        message = (<div style={{color:'red'}}>You don't have any stocks to sell.</div>)
    }
    return (
      <div className="login-bg">
        <div className="container">
            <div className="row">
                <div className="col-md-4 col-md-offset-4">
                    <div className="log-in panel">
                        <div className="panel-heading">
                            <h2>Sell</h2>
                        </div>
                            <div className="panel-body">
                                {message}
                                <div className="select-field">
                                    <span style={{color:'grey',fontSize:'0.8em'}}>Stock</span>
                                    <select style={{display:"block"}} onChange={(e) => this.updateStock(e.target.value)}>
                                        {options}
                                    </select>
                                </div>
                                <div className="select-field">
                                    <span style={{color:'grey',fontSize:'0.8em'}}>Quantity</span>
                                    <select style={{display:"block"}} onChange={(e) => this.updateQuantity(e.target.value)}>
                                        {quantity_options}
                                    </select>
                                </div>
                                <div id='lower-sell-fields' style={{display:'none'}}>
                                    <div className="select-field">
                                        <span style={{color:'grey',fontSize:'0.8em'}}>Price ($)</span>
                                        <input className='input-lg' type='number' id='price' step='any' onChange={(e) => this.updatePrice(e.target.value)} required />
                                    </div>
                                    <div className="input-field">
                                        <span style={{color:'grey',fontSize:'0.9em'}}>The Great</span>
                                        <textarea  id='the-great' onChange={(e) => this.updateTheGreat(e.target.value)} required />
                                    </div>
                                    <div className="input-field">
                                        <span style={{color:'grey',fontSize:'0.9em'}}>The Good</span>
                                        <textarea  id='the-good' onChange={(e) => this.updateTheGood(e.target.value)} required />
                                    </div>
                                    <div className="input-field">
                                        <span style={{color:'grey',fontSize:'0.9em'}}>The Bad</span>
                                        <textarea id='the-bad' onChange={(e) => this.updateTheBad(e.target.value)} required />
                                    </div>
                                    <div className="input-field">
                                        <span style={{color:'grey',fontSize:'0.9em'}}>The Ugly</span>
                                        <textarea  id='the-ugly' onChange={(e) => this.updateTheUgly(e.target.value)} required />
                                    </div>
                                    <div className="input-field">
                                        <button className='waves-effect waves-light btn' onClick={()=> this.submitForm()} id='submit-sell-button'>Submit</button>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
  }
}

export default withRouter(Sell);