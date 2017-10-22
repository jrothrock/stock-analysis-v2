import PropTypes from 'prop-types';
import React from 'react';
import {withRouter} from 'react-router-dom';
import Buy from './buy'
import Sell from './sell'

class Ledger extends React.Component {

  constructor(props) {
    super(props);

    this.state = { stock: this.props.stock,
                   description: this.props.description
                 };
    this.updateMessage = props.updateMessage;
    this.updateAssets = props.updateAssets;
  }

    updateStock = (stock) => {
        this.setState({ stock });
    };
    updateDescription = (description) =>{
        this.setState({description})
    }

render() {
    setTimeout(()=> {
      $('ul.tabs').tabs();
    }, 1);
    return (
      <div className="row">
        <div className="col s12">
            <ul className="tabs">
                <li className="tab col s6"><a className="active" href="#buy">Buy</a></li>
                <li className="tab col s6"><a href="#sell">Sell</a></li>
            </ul>
        </div>
        <div id="buy" className="col s12"><Buy updateMessage={this.updateMessage} updateAssets={this.updateAssets} /></div>
        <div id="sell" className="col s12"><Sell updateMessage={this.updateMessage} updateAssets={this.updateAssets} /></div>
      </div>
    );
  }
}

export default withRouter(Ledger);