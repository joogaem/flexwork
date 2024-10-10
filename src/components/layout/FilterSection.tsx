import React, { useState, useEffect } from 'react';
import {
  Typography, Button, Box, Accordion, AccordionSummary, AccordionDetails,
  FormGroup, FormControlLabel, Radio, RadioGroup, useMediaQuery, useTheme, Theme,
} from '@mui/material';
import { ExpandMore, RestartAlt, FilterList } from '@mui/icons-material';

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
  const [showFilters, setShowFilters] = useState(false);
  const theme = useTheme();
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down('md'));

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

  // 모든 필터 초기화 함수
  const resetAllFilters = () => {
    setSelectedFilters({});
  };

  // 모든 필터 보기/숨기기 토글 함수
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <Box className="filter-section">
      {isMobileOrTablet && (
        <Button
          fullWidth
          className="btn-show-filters"
          onClick={toggleFilters}
          startIcon={<FilterList />}
          sx={{
            color: '#00c853',
            '&:hover': {
              backgroundColor: '#00c85333', // 약간의 투명도를 가진 배경색
            },
          }}
        >
          {showFilters ? '필터 숨기기' : '모든 필터 보기'}
        </Button>
      )}
      {(!isMobileOrTablet || showFilters) && (
        <>
          {filterData && filterData.search_header.map((category, index) => (
            <Accordion key={category.key}
              className='accordion-filter-category'>
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
        </>
      )}
    </Box>
  );
}

export default FilterSection;