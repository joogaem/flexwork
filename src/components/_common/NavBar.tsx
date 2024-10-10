import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Button,
  Typography,
  ListItemText,
  Box,
  Drawer,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  Menu as MenuIcon,
  ExpandLess,
  ExpandMore,
  NotificationsNone as NotificationsNoneIcon
} from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import '../../resources/styles/NavBar.scss';

const NavBar = () => {

  const [isExpanded, setIsExpanded] = useState(false);

  const theme = useTheme();
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down('md'));


  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const menuLinks = [
    '채용공고',
    '블로그',
    '커리어 발전소',
    '커뮤니티',
    '자료실'
  ];

  const renderMobileTabletView = () => (
    <div className="navbar-mobile-container">
      <Box className="navbar-mobile-content">
        <Box className="navbar-logo-container">
          <img
            src="https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F7f28b2c00c330876f285822b6323e55d.cdn.bubble.io%2Ff1686685319389x618461784580355300%2Fimage%25201840%2520%25281%2529.png?w=192&h=46&auto=compress&fit=crop&dpr=1"
            alt="Flexwork Logo"
            className="navbar-logo"
          />
        </Box>
        <Box className="navbar-mobile-actions">
          <IconButton className="navbar-icon-button">
            <NotificationsNoneIcon className="navbar-notification-icon" />
          </IconButton>
          <IconButton onClick={toggleExpand} className="navbar-icon-button">
            {isExpanded ? (
              <CloseIcon className="navbar-close-icon" />
            ) : (
              <MenuIcon className="navbar-menu-icon" />
            )}
          </IconButton>
        </Box>
      </Box>
    </div>
  );

  const renderDesktopView = () => (
    <>
      <Box className="navbarLinks">
        <Box className="navbar-logo-container">
              <img src="https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F7f28b2c00c330876f285822b6323e55d.cdn.bubble.io%2Ff1686685319389x618461784580355300%2Fimage%25201840%2520%25281%2529.png?w=192&h=46&auto=compress&fit=crop&dpr=1" alt="Flexwork Logo" className="navbar-logo" />
            </Box>
          {menuLinks.map((link, index) => (
            <div key={index}>
              <a href="#" className="navbarLink">{link}</a>
            </div>
          ))}
        </Box>
        <Box display="flex" alignItems="center">
          <div className="welcomeText">
            윤영주님, 환영합니다!
          </div>
          <IconButton color="inherit">
            <NotificationsNoneIcon className="notificationIcon" style={{ color: 'white' }} />
          </IconButton>
          <IconButton>
            <Avatar src="https://example.com/user-profile.jpg" alt="User Profile" className="avatar" style={{ color: 'white' }} />
          </IconButton>
        </Box>
    </>
  );

  return (
    <>
      <AppBar position="static" className="navbar">
        <Toolbar className="navbar-toolbar">
          <Box className="navbar-container">
            {isMobileOrTablet ? renderMobileTabletView() : renderDesktopView()}
          </Box>
        </Toolbar>
      </AppBar>
      {isExpanded && (
        <>
          <AppBar className="navbar" position="static">
            <Toolbar className="navbar-toolbar" style={{ justifyContent: 'flex-end', maxWidth: '600px', margin: '0 auto', width: '100%', padding: '0 30px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <Box style={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="caption" color="inherit" style={{ marginRight: '8px' }}>
                  윤영주님, 환영합니다!
                </Typography>
                <Button
                  variant="contained"
                  size="small"
                  style={{
                    backgroundColor: '#32C3A3',
                    color: 'black',
                    borderRadius: '50px',
                    padding: '4px 8px',
                    fontSize: '12px',
                  }}
                >
                  로그아웃
                </Button>
                <Avatar
                  alt="윤영주 사진"
                  src="https://picsum.photos/200"
                  style={{ marginLeft: '10px', width: '50px', height: '50px' }}
                />
              </Box>
            </Toolbar>
          </AppBar>
                
          {/* 네비게이션 메뉴 */}
          <Box style={{ backgroundColor: 'rgb(34, 34, 34)', padding: '20px' }}>
            <Box className="navbar-toolbar" style={{ maxWidth: '600px', margin: '0 auto', width: '100%', padding: '0 30px' }}>
              <Box
                style={{
                  maxWidth: '600px',
                  margin: '0 auto',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  color: '#FFFFFF',
                  fontSize: '18px',
                  fontWeight: 'bold'
                }}
              >
                {menuLinks.map((link, index) => (
                  <Typography 
                    key={index} 
                    component="a" 
                    href="#" 
                    style={{ 
                      textDecoration: 'none', 
                      color: 'inherit', 
                      fontWeight: 'bold',
                      marginRight: index !== menuLinks.length - 1 ? '20px' : '0'
                    }}
                  >
                    {link}
                  </Typography>
                ))}
              </Box>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default NavBar;
