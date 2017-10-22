import PropTypes from 'prop-types';
import React from 'react';
import {withRouter } from 'react-router-dom';
import { browserHistory } from 'react-router';

class App extends React.Component  {
  constructor(props) {
    super(props);
    
    this.props.history.listen((location, action) => {
      window.scrollTo(0, 0); // make sure we always start at the top of the page.
    });
    this.watchScroll();
  }

  watchScroll(){
    $(window).scroll(function(){
        if ($(this).scrollTop() > 100) {
            $('#back-to-top').fadeIn();
        } else {
            $('#back-to-top').fadeOut();
        }
    });
  }

  scrollToTop(e){    
    e.preventDefault();
    $('html,body').animate({scrollTop:0}, 500);
  }
  render() {
     return (<div>
                {this.props.children}
                <a href="#" id="back-to-top" className="rippler rippler-bs-default" style={{display: 'none'}} onClick={(e)=> this.scrollToTop(e)}>
                    <i className="fa fa-angle-up"></i>
                </a>
            </div>
    );
  }
}

export default withRouter(App);