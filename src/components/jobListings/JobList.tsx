import React, { useState, useEffect, useCallback } from 'react';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Chip,
    Box,
    Pagination
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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

type FilteredJobs = Job[];

function JobPostingList({ selectedFilters, searchTerm }: { selectedFilters: Record<string, string>, searchTerm: string }) {
    const [page, setPage] = useState(1);
    const [allJobs, setAllJobs] = useState<FilteredJobs>([]);
    const [filteredJobs, setFilteredJobs] = useState<FilteredJobs>([]);
    const [displayedJobs, setDisplayedJobs] = useState<FilteredJobs>([]);
    const jobsPerPage = 10;
    const [likedJobs, setLikedJobs] = useState<Set<number>>(new Set());
    const [hasMore, setHasMore] = useState(true);

    const theme = useTheme();
    const isMobileOrTablet = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
        fetch('/jobPosting.json')
            .then(response => response.json())
            .then((data: FilteredJobs) => {
                setAllJobs(data);
            })
            .catch(error => console.error(error));
    }, []);

    useEffect(() => {
        const filtered = allJobs.filter(job => {
            const filterMatch = Object.entries(selectedFilters).every(([key, value]) => {
                const jobValue = job[key as keyof Job];
                const match = value === '' || jobValue === value;
                return match;
            });

            const searchMatch = searchTerm === '' ||
                job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                job.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                job.contents.toLowerCase().includes(searchTerm.toLowerCase());

            return filterMatch && searchMatch;
        });
        document.querySelector('.listings-container')?.scrollTo(0, 0);
        setFilteredJobs(filtered);
        setPage(1);
    }, [selectedFilters, searchTerm, allJobs]);

    useEffect(() => {
        if (isMobileOrTablet) {
            setDisplayedJobs(filteredJobs.slice(0, page * jobsPerPage));
        } else {
            const startIndex = (page - 1) * jobsPerPage;
            const endIndex = startIndex + jobsPerPage;
            setDisplayedJobs(filteredJobs.slice(startIndex, endIndex));
        }
        setHasMore(page * jobsPerPage < filteredJobs.length);
    }, [filteredJobs, page, isMobileOrTablet, jobsPerPage]);

    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        document.querySelector('.listings-container')?.scrollTo(0, 0);
    };

    const loadMore = useCallback(() => {
        if (isMobileOrTablet && hasMore) {
            setPage(prevPage => prevPage + 1);
        }
    }, [isMobileOrTablet, hasMore]);

    const handleLikeToggle = (index: number) => {
        setLikedJobs(prevLikedJobs => {
            const newLikedJobs = new Set(prevLikedJobs);
            if (newLikedJobs.has(index)) {
                newLikedJobs.delete(index);
            } else {
                newLikedJobs.add(index);
            }
            return newLikedJobs;
        });
    };

    const isHighlightedBadge = (badge: string) => {
        return Object.values(selectedFilters).some(filter => filter.toLowerCase() === badge.toLowerCase());
    };

    return (
        <Box sx={{ flexGrow: 1, padding: '0 20px' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {displayedJobs.length > 0 && displayedJobs.map((job, index) => (
                    <Box key={index} sx={{ width: '100%' }}>
                        <Card className="job-card">
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <CardContent sx={{ flexGrow: 1, paddingLeft: '30px' }}>
                                    <Typography variant="body2" color="text.secondary">
                                        {job.company_name}
                                    </Typography>
                                    <Typography gutterBottom variant="h6" component="div" fontWeight="bold">
                                        {job.title}
                                    </Typography>
                                    <Box sx={{ mt: 1, mb: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                        {job.badge.map((badge, idx) => (
                                            <Chip
                                                key={idx}
                                                label={badge}
                                                size="small"
                                                sx={{
                                                    backgroundColor: isHighlightedBadge(badge) ? 'rgba(0, 200, 83, 0.5)' : undefined,
                                                    color: isHighlightedBadge(badge) ? '#000' : undefined,
                                                }}
                                            />
                                        ))}
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <LocationOnIcon sx={{ fontSize: 'small', mr: 0.5, color: 'text.secondary' }} />
                                        <Typography variant="body2" color="text.secondary">
                                            {job.country}
                                        </Typography>
                                    </Box>
                                </CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, pr: 2 }}>
                                    <CardMedia
                                        component="img"
                                        sx={{
                                            width: 60,
                                            height: 60,
                                            objectFit: 'contain',
                                            borderRadius: '7%',
                                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                                        }}
                                        image={job.image_url}
                                        alt={job.company_name}
                                    />
                                    <IconButton onClick={() => handleLikeToggle(index)}>
                                        {likedJobs.has(index) ? (
                                            <FavoriteIcon color="error" />
                                        ) : (
                                            <FavoriteBorderIcon />
                                        )}
                                    </IconButton>
                                </Box>
                            </Box>
                        </Card>
                    </Box>
                ))}
            </Box>
            {displayedJobs.length > 0 ? (
                isMobileOrTablet ? (
                    hasMore && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                            <Typography
                                variant="body1"
                                color="text.secondary"
                                onClick={loadMore}
                                className="btn-load-more"
                            >
                                더 보기
                                <ExpandMoreIcon />
                            </Typography>
                        </Box>
                    )
                ) : (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                        <Pagination
                            count={Math.ceil(filteredJobs.length / jobsPerPage)}
                            page={page}
                            onChange={handleChangePage}
                            color="primary"
                        />
                    </Box>
                )
            ) : (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <Typography variant="body1" color="text.secondary">
                        검색 결과가 없습니다.
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default JobPostingList;
