import React, { useState, useEffect } from 'react';
import {
  Typography, Button, Box, Accordion, AccordionSummary, AccordionDetails,
  FormGroup, FormControlLabel, Radio, RadioGroup,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

// 새로운 타입 정의
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

  useEffect(() => {
    fetch('/filterCategories.json')
      .then(response => response.json())
      .then((data: FilterData) => setFilterData(data))
      .catch(error => console.error('Error loading filter categories:', error));
  }, []);

  // Radio 버튼 상태 변경 처리 함수
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
        control={<Radio />}
        label="전체"
        value=""
      />
      {items.map(item => (
        <FormControlLabel
          key={item.value}
          control={
            <Radio
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

  // 모든 필터 초기화 함수
  const resetAllFilters = () => {
    setSelectedFilters({});
  };

  return (
    <Box className="filter-section">
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        채용공고 검색 조건
      </Typography>
      {filterData && filterData.search_header.map((category, index) => (
        <Accordion key={category.key}>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
          >
            <Typography>{category.value}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {renderRadioGroup(filterData.search_condition[index], category.key)}
          </AccordionDetails>
        </Accordion>
      ))}
      <Button fullWidth className="btn-filter-reset" onClick={resetAllFilters}>
        모든 필터 초기화
      </Button>
    </Box>
  );
}

export default FilterSection;