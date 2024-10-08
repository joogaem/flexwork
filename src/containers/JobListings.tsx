import React, { useState, useEffect } from 'react';

// 컴포넌트
import NavBar from '../components/_common/NavBar';
// import Footer from '../components/Footer';
// import JobList from '../components/JobList';
// import SearchBar from '../components/SearchBar';
// import FilterSection from '../components/FilterSection';

// // 스타일
// import '../styles/JobListings.css';

// 타입
// import { Job } from '../types/Job';

// // API
// import { fetchJobs } from '../api/jobApi';

function JobListings() {
//   const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    // const loadJobs = async () => {
    //   const fetchedJobs = await fetchJobs();
    //   setJobs(fetchedJobs);
    // };
    // loadJobs();
  }, []);

  return (
    <div className="job-listings">
      <main>
        {/* <SearchBar /> */}
        <div className="content">
          {/* <FilterSection />
          <JobList jobs={jobs} /> */}
        </div>
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default JobListings;
