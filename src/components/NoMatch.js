import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NoMatch extends Component {
  render() {
    return (
      <div>
        <h1> Page Not Found </h1>
        <h3> 404 ERROR </h3>
        <p>Sorry, there is nothing in this page. </p>
        <p><Link to='/'>Back to Home</Link></p>
      </div>

    )
  }
}

export default NoMatch