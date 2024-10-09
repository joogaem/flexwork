import React from 'react';

import NavBar from '../components/_common/NavBar';
import JobListings from '../containers/JobListings';

import '../resources/styles/Common.scss';

function Main() {
  return (
    <div className="main-container">
      <NavBar />
      <div className="content-container">
        <JobListings />
      </div>
    </div>
  );
}

export default Main;
