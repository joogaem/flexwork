import React, { useState, useEffect } from 'react';

import FilterSection from '../components/layout/FilterSection';
import JobList from '../components/feature/JobList';
import SearchBar from '../components/feature/SearchBar';
import '../resources/styles/JobListings.scss';


function JobListings() {
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({});
  const [searchTerm, setSearchTerm] = useState<string>('');

  return (
    <div className="job-listings">
      <div className="filter-container">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <FilterSection selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} />
      </div>

      <div className="listings-container">
        <JobList selectedFilters={selectedFilters} searchTerm={searchTerm} />
      </div>
    </div>
  );
};

export default JobListings;
