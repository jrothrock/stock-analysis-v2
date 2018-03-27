import PropTypes from 'prop-types';
import React from 'react';
import Statistics from './statistics';
import About from './about';
import Ledger from './ledger';
import Assets from './assets';
export default class Home extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = { signed_in: this.props.signed_in,
                   message: this.props.message,
                   message_type: this.props.message_type,
                   message_text: this.props.message_text,
                   stocks: [],
                   ledger: this.props.ledger,
                   assets: this.props.assets
                 };
      this.updateAssets = props.updateAssets;
      if(!this.props.ledger) this.getStocks();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ assets: nextProps.assets, ledger: nextProps.ledger });  
  }


  removeAlert(){
    if($(".alert-container").length){
        $(".alert-container").addClass('fadeout')
      }
  }


  // this will get called, if the person reloads the page on the stock/graph page.
  getStocks(){
     $.ajax({
        url: `${location.origin}/api/v1/stocks`,
        type: 'GET',
        success: (data) => {
          this.updateAssets(data.assets, data.ledger)
            this.setState({ledger:data.ledger, assets: data.assets})
        },
        error: (error) =>{
            console.log(error);
        }
      });
  }

  scrollToHash(e,location){    
    e.preventDefault();
    $('html,body').animate({scrollTop:$(`#${location}`).offset().top}, 500);
  }

  render() {
    let alert = (<div style={{height:'70px'}}></div>)
    if(this.state.message){
      alert = (<div className="alert-container"><div className='alert-outer-container'><div className={'alert alert-'+this.state.message_type}><p className='center'>{this.state.message_text}</p></div></div></div>)
      setTimeout(()=>{
        this.removeAlert()
      },4000)
    } 

    return (
      <div>
        <div>
          {alert}
        </div>
        <div className='home-links'>
          <a href='#statistics' onClick={(e)=> this.scrollToHash(e,'statistics')}><div className='home-links-container'>Statistics</div></a>
          <a href='#about' onClick={(e)=> this.scrollToHash(e,'about')}><div className='home-links-container'>About</div></a>
          <a href='#current' onClick={(e)=> this.scrollToHash(e,'current')}><div className='home-links-container'>Current</div></a>
          <a href='#ledger' onClick={(e)=> this.scrollToHash(e,'ledger')}><div className='home-links-container'>Ledger</div></a>
        </div>
        <Statistics assets={this.state.assets} />
        <About  />
        <Assets assets={this.state.assets} />
        <Ledger entries={this.state.ledger} />
      </div>
    );
  }
}
