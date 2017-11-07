import PropTypes from 'prop-types';
import React from 'react';
import {withRouter} from 'react-router-dom';

class Buy extends React.Component {

  constructor(props) {
    super(props);

    this.state = { stock: '',
                   the_great: '',
                   the_good: '',
                   the_bad: '',
                   the_ugly: '',
                   quantity:1
                 };
    this.updateMessage = props.updateMessage;
    this.updateAssets = props.updateAssets;
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
    }
    updatePrice = (price) => {
        this.setState({price:price})
    }

    submitForm = () =>{
        $.ajax({
            url: `${location.origin}/api/v1/stocks/purchase`,
            headers: { 'Authorization': `Bearer ${localStorage.getItem("_stock_analysis_session")}` },
            data: {ticker:this.state.stock,quantity:this.state.quantity,price:this.state.price,great:this.state.the_great,good:this.state.the_good,bad:this.state.the_bad,ugly:this.state.the_ugly},
            type: 'POST',
            success: (data) => {
                this.updateAssets(data.assets, data.ledger)
                this.updateMessage('success',`Successfully Purchased ${this.state.quantity} ${this.state.stock}`)
                this.props.history.push('/');
            },
            error: (error) =>{
                console.log(error);
                Materialize.toast("Ticker Doesn't Exist", 3000, 'rounded-error');
            }
        });
    };

render() {
    return (
      <div className="login-bg">
        <div className="container">
            <div className="row">
                <div className="col-md-4 col-md-offset-4">
                    <div className="log-in panel">
                        <div className="panel-heading">
                            <h2>Buy</h2>
                        </div>
                            <div className="panel-body">
                                <div className="input-field">
                                    <input className='input-lg' type='text' autoFocus='true' id='stock' onChange={(e) => this.updateStock(e.target.value)} required />
                                    <label htmlFor="stock">Stock</label>
                                </div>
                                <div className="input-field">
                                    <span style={{color:'grey',fontSize:'0.8em'}}>Quantity</span>
                                    <input className='input-lg' type='number' id='quantity' defaultValue="1" step='1' onChange={(e) => this.updateQuantity(e.target.value)} required />
                                </div>
                                <div className="input-field">
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
                                    <button className='waves-effect waves-light btn' onClick={()=> this.submitForm()}>Submit</button>
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

export default withRouter(Buy);