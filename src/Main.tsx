import React from 'react';

import JobListings from './containers/JobListings';
import NavBar from './components/_common/NavBar';

function Main() {
  return (
    <div>
        <NavBar />
        <JobListings />
    </div>
  );
}

export default Main;
