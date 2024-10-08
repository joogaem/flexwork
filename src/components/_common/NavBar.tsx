import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Collapse,
  Drawer,
  useMediaQuery
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  ExpandLess,
  ExpandMore,
  NotificationsNone as NotificationsNoneIcon
} from '@mui/icons-material';
import '../../resources/styles/NavBar.scss';

const NavBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState<number | null>(null);
  const isMobile = useMediaQuery('(max-width:767px)');

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const handleCategoryClick = (index: number) => {
    setOpenCategory(openCategory === index ? null : index);
  };

  const menuLinks = [
    { 
      label: '채용공고', 
      subLinks: ['교육', '커리어 코칭'] 
    },
    { 
      label: '블로그', 
      subLinks: ['교육', '커리어 코칭'] 
    },
    { 
      label: '커리어 발전소', 
      subLinks: ['교육', '커리어 코칭'] 
    },
    { 
      label: '커뮤니티', 
      subLinks: ['포럼', 'Q&A'] 
    },
    { 
      label: '자료실', 
      subLinks: ['도서', '튜토리얼'] 
    }
  ];

  return (
    <AppBar position="static" className='navbar' style={{ backgroundColor: 'rgb(34, 34, 34)' }}>
      <Toolbar className="toolbar">
      <Box display="flex" alignItems="center" >
        <Box marginRight="20px">
          <img src="https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F7f28b2c00c330876f285822b6323e55d.cdn.bubble.io%2Ff1686685319389x618461784580355300%2Fimage%25201840%2520%25281%2529.png?w=192&h=46&auto=compress&fit=crop&dpr=1" alt="Flexwork Logo" className="logo" />
        </Box>

        {isMobile ? (
          <Box display="flex" alignItems="center">
            <IconButton>
              <NotificationsNoneIcon className="notificationIcon" />
            </IconButton>
            <IconButton onClick={toggleDrawer(true)}>
              <MenuIcon className="menuIcon" />
            </IconButton>
          </Box>
        ) : (
          <Box className="navbarLinks">
            {menuLinks.map((link, index) => (
              <div key={index}>
                <a href="#" className="navbarLink">{link.label}</a>
              </div>
            ))}
          </Box>
        )}
        </Box>
        {/* 오른쪽 사용자 정보 */}
        {!isMobile && (
          <Box display="flex" alignItems="center">
            <div className="welcomeText">
              윤영주님, 환영합니다!
            </div>
            <IconButton color="inherit">
              <NotificationsNoneIcon className="notificationIcon" />
            </IconButton>
            <IconButton>
              <Avatar src="https://example.com/user-profile.jpg" alt="User Profile" className="avatar" />
            </IconButton>
          </Box>
        )}

        {/* Drawer (모바일용 햄버거 메뉴, 2뎁스 구조) */}
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
          PaperProps={{ style: { width: '100%', maxWidth: '320px' } }} // 화면 꽉차게 설정
        >
          <List>
            {menuLinks.map((menu, index) => (
              <React.Fragment key={index}>
                <ListItemButton onClick={() => handleCategoryClick(index)}>
                  <ListItemText primary={menu.label} />
                  {openCategory === index ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openCategory === index} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {menu.subLinks.map((subLink, subIndex) => (
                      <ListItemButton key={subIndex} sx={{ pl: 4 }}>
                        <ListItemText primary={subLink} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              </React.Fragment>
            ))}
          </List>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
