import React, { useState, useEffect } from 'react';

// 컴포넌트
import NavBar from '../components/_common/NavBar';
import FilterSection from '../components/layout/FilterSection';
// import Footer from '../components/Footer';
import JobList from '../components/feature/JobList';
import SearchBar from '../components/feature/SearchBar';
// import FilterSection from '../components/FilterSection';

// // 스타일
import '../resources/styles/JobListings.scss';

// 타입
// import { Job } from '../types/Job';

// // API
// import { fetchJobs } from '../api/jobApi';

function JobListings() {
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({});
  const [searchTerm, setSearchTerm] = useState<string>('');
  //   const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    // const loadJobs = async () => {
    //   const fetchedJobs = await fetchJobs();
    //   setJobs(fetchedJobs);
    // };
    // loadJobs();
  }, []);

  useEffect(() => {
    console.log('selectedFilters:', selectedFilters);
  }, [selectedFilters]);
  useEffect(() => {
    console.log('searchTerm:', searchTerm);
  }, [searchTerm]);

  return (
    <div className="job-listings">
      <div className="filter-container">
        <FilterSection selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} />
      </div>

      <div className="listings-container">
        리스트
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <JobList selectedFilters={selectedFilters} searchTerm={searchTerm} />
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default JobListings;
