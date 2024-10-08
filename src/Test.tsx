import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  Container, Typography, TextField, Button, Card, CardContent,
  CardHeader, Chip, Avatar, IconButton, Box, Grid, Drawer,
  List, ListItem, ListItemText, useMediaQuery
} from '@mui/material';
import {
  Search, ExpandMore, LocationOn, AccessTime, Favorite,
  FilterList, Close
} from '@mui/icons-material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});

const categories = [
  "직군",
  "지역",
  "고용형태",
  "경력",
  "주당 업무시간",
];

const jobListings = [
  {
    id: 1,
    company: "(주)그렙",
    logo: "/api/placeholder/40/40",
    title: "[프로그래머스] 보안담당자(보안엔지니어)",
    tags: ["지역 제한 없음", "부분원격근무", "정규직"],
    location: "대한민국",
    postedTime: "주 40시간 (풀타임)",
  },
  {
    id: 2,
    company: "가비트코리아 주식회사",
    logo: "/api/placeholder/40/40",
    title: "회계/자금 리더급",
    tags: ["국내 거주 필수", "유연근무", "정규직"],
    location: "대한민국",
    postedTime: "주 40시간 (풀타임)",
  },
  {
    id: 3,
    company: "(주)그렙",
    logo: "/api/placeholder/40/40",
    title: "[프로그래머스] 사업전략/사업개발 (전환형1년계약직)",
    tags: ["지역 제한 없음", "부분원격근무", "계약직"],
    location: "대한민국",
    postedTime: "주 40시간 (풀타임)",
  },
];

export default function ImprovedJobListings() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleDrawer = 
    (open: boolean) => 
    (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || 
       (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const FilterSection = () => (
    <Box>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        채용공고 검색 조건
      </Typography>
      <List>
        {categories.map((category) => (
          <ListItem key={category} disablePadding>
            <Button
              fullWidth
              variant="outlined"
              endIcon={<ExpandMore />}
              sx={{ justifyContent: 'space-between', my: 1 }}
            >
              {category}
            </Button>
          </ListItem>
        ))}
      </List>
      <Button
        fullWidth
        variant="contained"
        color="secondary"
        sx={{ mt: 2 }}
      >
        모든 필터 초기화
      </Button>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ py: 4, bgcolor: 'background.default', minHeight: '100vh' }}>
        <Grid container spacing={3}>
          {!isMobile && (
            <Grid item xs={12} md={4}>
              <FilterSection />
            </Grid>
          )}
          <Grid item xs={12} md={isMobile ? 12 : 8}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <TextField
                variant="outlined"
                placeholder="Search jobs"
                InputProps={{
                  startAdornment: <Search color="action" sx={{ mr: 1 }} />,
                }}
                sx={{ flexGrow: 1, mr: 2 }}
              />
              {isMobile && (
                <Button
                  variant="outlined"
                  startIcon={<FilterList />}
                  onClick={toggleDrawer(true)}
                >
                  Filters
                </Button>
              )}
            </Box>
            {jobListings.map((job) => (
              <Card key={job.id} sx={{ mb: 3, '&:hover': { boxShadow: 6 }, transition: 'box-shadow 0.3s' }}>
                <CardHeader
                  avatar={
                    <Avatar src={job.logo} alt={`${job.company} logo`}>
                      {job.company.slice(0, 2)}
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label="add to favorites">
                      <Favorite />
                    </IconButton>
                  }
                  title={
                    <Typography variant="h6" component="div" fontWeight="bold">
                      {job.title}
                    </Typography>
                  }
                  subheader={
                    <Typography variant="subtitle1" color="text.secondary">
                      {job.company}
                    </Typography>
                  }
                />
                <CardContent>
                  <Box sx={{ mb: 2 }}>
                    {job.tags.map((tag, index) => (
                      <Chip
                        key={index}
                        label={tag}
                        size="small"
                        sx={{ mr: 1, mb: 1, borderRadius: '4px' }}
                      />
                    ))}
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary', fontSize: 14 }}>
                    <LocationOn fontSize="small" sx={{ mr: 1 }} />
                    <Typography variant="body2" sx={{ mr: 2 }}>{job.location}</Typography>
                    <AccessTime fontSize="small" sx={{ mr: 1 }} />
                    <Typography variant="body2">{job.postedTime}</Typography>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </Grid>
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
        >
          <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
              <IconButton onClick={toggleDrawer(false)}>
                <Close />
              </IconButton>
            </Box>
            <Box sx={{ px: 2 }}>
              <FilterSection />
            </Box>
          </Box>
        </Drawer>
      </Container>
    </ThemeProvider>
  );
}