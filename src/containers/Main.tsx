import React from 'react';

import NavBar from '../components/_common/NavBar';
import JobListings from '../containers/JobListings';
// import Footer from '../components/_common/Footer'; 
// UX 관점에서 리스트 집중도를 높이기 위해 Footer를 제거함.

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
