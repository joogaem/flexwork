import React, { useState, useEffect } from 'react';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Grid,
    Chip,
    Box,
    Pagination
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

// Job 인터페이스 정의
interface Job {
    company_name: string;
    title: string;
    badge: string[];
    country: string;
    image_url: string;
    contents: string;
    like: boolean;
    occupation: string;
    region: string;
    employment_type: string;
    career: string;
    working_hours_per_week: string;
}

// 또는 별도의 타입으로 정의할 경우
type FilteredJobs = Job[];

function JobPostingList({ selectedFilters, searchTerm }: { selectedFilters: Record<string, string>, searchTerm: string }) {
    const [page, setPage] = useState(1);
    const [filteredJobs, setFilteredJobs] = useState<FilteredJobs>([]);
    const jobsPerPage = 10;

    useEffect(() => {
        fetch('/jobPosting.json')
            .then(response => response.json())
            .then((data: FilteredJobs) => {
                // 필터링 및 검색 로직 적용
                const filtered = data.filter(job => {
                    // 선택된 필터에 대한 검사
                    const filterMatch = Object.entries(selectedFilters).every(([key, value]) => {
                        const jobValue = job[key as keyof Job];
                        const match = value === '' || jobValue === value;
                        console.log(`Filter: ${key}, Job value: ${jobValue}, Filter value: ${value}, Match: ${match}`);
                        return match;
                    });
                    console.log(`Overall filter match for job ${job.title}: ${filterMatch}`);

                    // 검색어에 대한 검사
                    const searchMatch = searchTerm === '' ||
                        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        job.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        job.contents.toLowerCase().includes(searchTerm.toLowerCase());

                    return filterMatch && searchMatch;
                });

                setFilteredJobs(filtered);
                setPage(1); // 필터링 후 첫 페이지로 리셋
            })
            .catch(error => console.error('Error loading job postings:', error));
    }, [selectedFilters, searchTerm]);

    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const startIndex = (page - 1) * jobsPerPage;
    const endIndex = startIndex + jobsPerPage;
    const displayedJobs = filteredJobs.slice(startIndex, endIndex);

    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {displayedJobs.map((job, index) => (
                    <Box key={index} sx={{ width: '100%' }}>
                        <Card>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <CardMedia
                                    component="img"
                                    sx={{ width: 80, height: 80, objectFit: 'contain', m: 2 }}
                                    image={job.image_url}
                                    alt={job.company_name}
                                />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography gutterBottom variant="h6" component="div">
                                        {job.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {job.company_name}
                                    </Typography>
                                    <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                        {job.badge.map((badge, idx) => (
                                            <Chip key={idx} label={badge} size="small" />
                                        ))}
                                    </Box>
                                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                        {job.occupation} | {job.employment_type} | {job.career}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {job.working_hours_per_week}
                                    </Typography>
                                </CardContent>
                                <Box sx={{ pr: 2 }}>
                                    {job.like ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
                                </Box>
                            </Box>
                        </Card>
                    </Box>
                ))}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Pagination
                    count={Math.ceil(filteredJobs.length / jobsPerPage)}
                    page={page}
                    onChange={handleChangePage}
                    color="primary"
                />
            </Box>
        </Box>
    );
};

export default JobPostingList;
