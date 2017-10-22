import PropTypes from 'prop-types';
import React from 'react';
import {withRouter } from 'react-router-dom';

class New_Stock extends React.Component {

  constructor(props) {
    super(props);

    this.state = { stock: this.props.stock,
                   description: this.props.description
                 };
    this.updateMessage = props.updateMessage;
  }

    updateStock = (stock) => {
        this.setState({ stock });
    };
    updateDescription = (description) =>{
        this.setState({description})
    }

    submitForm = () =>{
        $.ajax({
            url: `${location.origin}/api/v1/stocks`,
            headers: { 'Authorization': `Bearer ${localStorage.getItem("_stock_analysis_session")}` },
            data: {ticker:this.state.stock,description:this.state.description},
            type: 'POST',
            success: (data) => {
                this.updateMessage('success','Successfully Submitted Ticker')
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
                            <h2>Stock</h2>
                        </div>
                            <div className="panel-body">
                                <div className="input-field">
                                    <input className='input-lg' type='text' autoFocus='true' id='stock' onChange={(e) => this.updateStock(e.target.value)} required />
                                    <label htmlFor="stock">Stock</label>
                                </div>
                                <div className="input-field">
                                    <input className='input-lg' type='text' id='description' onChange={(e) => this.updateDescription(e.target.value)} required />
                                    <label htmlFor="description">Description</label>
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

export default withRouter(New_Stock);