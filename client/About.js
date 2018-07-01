import React, { Component } from 'react';

class About extends Component {
  render() {
    return (
      <div className="container about">
        <h5>About the website</h5>
        <p>This site is built using Node with Express on the backend and React on the front end.  Backbone is used for responsive styling.</p>
        <p>It queries all past SpaceX launches and does client-side filtering and sorting of the results.</p>
      </div>
    );
  }
}

export default About;
