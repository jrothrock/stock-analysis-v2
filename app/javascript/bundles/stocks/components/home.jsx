import PropTypes from 'prop-types';
import React from 'react';

export default class Home extends React.Component {
  
  constructor(props) {
    super(props);
    // How to set initial state in ES6 class syntax
    // https://facebook.github.io/react/docs/reusable-components.html#es6-classes
    this.state = { signed_in: this.props.signed_in,
                   message: this.props.message,
                   message_type: this.props.message_type,
                   message_text: this.props.message_text
                 };
  }

  removeAlert(){
    if($(".alert-container").length){
        $(".alert-container").addClass('fadeout')
        setTimeout(function(){
            $(".alert-container").remove();
        },400);
      }
  }

  render() {
    let lis = [];
    let alert = (<div></div>)
    // for 
    if(this.state.message){
      alert = (<div className="alert-container"><div className='alert-outer-container'><div className={'alert alert-'+this.state.message_type}><p className='center'>{this.state.message_text}</p></div></div></div>)
      setTimeout(()=>{
        this.removeAlert()
      },4000)
    } 

    return (
      <div>
        {alert}
      </div>
    );
  }
}
