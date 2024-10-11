import React, { useState, useEffect } from 'react';
import {
  Typography, Button, Box, Accordion, AccordionSummary, AccordionDetails, FormControlLabel, Radio, RadioGroup,
} from '@mui/material';
import { ExpandMore, RestartAlt, FilterList } from '@mui/icons-material';

interface FilterItem {
  id: number;
  key: string;
  value: string;
}

interface FilterData {
  search_header: FilterItem[];
  search_condition: FilterItem[][];
}

function FilterSection({ selectedFilters, setSelectedFilters }:
  { selectedFilters: Record<string, string>, setSelectedFilters: React.Dispatch<React.SetStateAction<Record<string, string>>> }) {

  const [filterData, setFilterData] = useState<FilterData | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [expandedAccordions, setExpandedAccordions] = useState<string[]>([]);

  useEffect(() => {
    fetch('/filterCategories.json')
      .then(response => response.json())
      .then((data: FilterData) => setFilterData(data))
      .catch(error => console.error('Error loading filter categories:', error));
  }, []);

  const handleRadioChange = (category: string, value: string) => {
    setSelectedFilters(prevFilters => ({
      ...prevFilters,
      [category]: value
    }));
  };

  const renderRadioGroup = (items: FilterItem[], category: string) => (
    <RadioGroup
      value={selectedFilters[category] || ''}
      onChange={(e) => handleRadioChange(category, e.target.value)}
    >
      <FormControlLabel
        key="all"
        control={<Radio className="radio-btn-filters" />}
        label="전체"
        value=""
        className='btn-filter-category'
      />
      {items.map(item => (
        <FormControlLabel
          key={item.value}
          control={
            <Radio
              className="radio-btn-filters"
              sx={{ '&.Mui-checked': { color: '#00c853' } }}
              checked={selectedFilters[category] === item.value}
              onChange={() => handleRadioChange(category, item.value)}
            />
          }
          label={item.value}
          value={item.value}
        />
      ))}
    </RadioGroup>
  );

  // 모든 필터 초기화 함수 수정
  const resetAllFilters = () => {
    setSelectedFilters({});
    setExpandedAccordions([]);
  };

  // 아코디언 확장/축소 처리 함수
  const handleAccordionChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedAccordions(prev =>
      isExpanded ? [...prev, panel] : prev.filter(item => item !== panel)
    );
  };

  // 모든 필터 보기/숨기기 토글 함수
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <Box className="filter-section">
      <Button
        fullWidth
        className="btn-show-filters responsive-only"
        onClick={toggleFilters}
        startIcon={<FilterList />}
      >
        {showFilters ? '필터 숨기기' : '모든 필터 보기'}
      </Button>
      <div className={`filter-content ${showFilters ? 'show' : ''}`}>
        {filterData && filterData.search_header.map((category, index) => (
          <Accordion 
            key={category.key} 
            className='accordion-filter-category'
            expanded={expandedAccordions.includes(category.key)}
            onChange={handleAccordionChange(category.key)}
          >
            <AccordionSummary
              expandIcon={<ExpandMore className='icon-expand' />}
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
            >
              <Typography variant="h6" fontWeight="bold">{category.value}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {renderRadioGroup(filterData.search_condition[index], category.key)}
            </AccordionDetails>
          </Accordion>
        ))}
        <Button
          fullWidth
          className="btn-filter-reset"
          onClick={resetAllFilters}
          startIcon={<RestartAlt />}
        >
          모든 필터 초기화
        </Button>
      </div>
    </Box>
  );
}

export default FilterSection;