import PropTypes from 'prop-types';
import React from 'react';
import {withRouter } from 'react-router-dom';

class Reroute extends React.Component {

  constructor(props) {
    super(props);
    this.state = { };
  }

  // unfortunatly has to be done, or else the children components don't reload.
  componentWillMount(){
      this.props.history.push('/');
  }


  render() {
    return (
        <div></div>
    );
  }
}

export default withRouter(Reroute)