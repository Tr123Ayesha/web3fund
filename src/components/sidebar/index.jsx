import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import dash from '../../assets/dashboard.svg';
import web3Logo from "../../assets/web3Logo.svg";
import profile from '../../assets/profile.svg';
import LatestNews from '../../assets/LatestNews.svg';
import box from '../../assets/box.svg';
import Sms from '../../assets/sms.svg';
import headphone from '../../assets/headphone.svg';
import feedback from '../../assets/feedback.svg';
import search from '../../assets/search-normal.svg';
import Frame from "../../assets/Frame.svg";
import setting from '../../assets/setting-2.svg';
import Notification from '../../assets/Notification.svg';
import image from '../../assets/image.svg';
import logout from '../../assets/logout.svg';
import './sidebar.css';
import { useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 264;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open, isSmallScreen }) => ({
    flexGrow: 1,
    height: "100%",
    overflowX: "hidden",
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    // Only apply margin-left when it's not a small screen
    marginLeft: isSmallScreen ? 0 : `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
      fontFamily: "Montserrat",
    }),
  })
);


const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  backgroundColor: "white",
  zIndex: "2",
}));

const AvatarTopDiv = styled("div")(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(1),
  right: theme.spacing(1),
  zIndex: theme.zIndex.drawer + 1,
  [theme.breakpoints.up("md")]: {
    width: "100%",
    minWidth: 768,
  },
  [theme.breakpoints.down("sm")]: {
    top: theme.spacing(1),
    left: theme.spacing(1),
    right: "auto",
    display: "flex",
    alignItems: "center",
    width: "100%",
    justifyContent: "flex-end",

    gap: theme.spacing(2),
  },
}));
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),

  ...theme.mixins.toolbar,
  justifyContent: "space-between",
  padding: "26px 24px",
  borderBottom: "none",
  zIndex: "2",
}));

export default function PersistentDrawerLeft({children}) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedGeneralIndex, setSelectedGeneralIndex] = React.useState(null); // State for General Menu
  const [selectedOtherIndex, setSelectedOtherIndex] = React.useState(null); // State for Other Menu
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const sidebarItems = [
    { text: "Dashboard", icon: dash, route: "/" },
    { text: "Referrals", icon: profile, route: "referrals" },
    { text: "Latest News", icon: LatestNews, route: "/" },
    { text: "Trade Web3Fund NFT", icon: box, route: "/" },
    { text: "Chat", icon: Sms, route: "/" },
  ];

  const otherItems = [
    { text: "Help", icon: headphone, route: "/" },
    { text: "Feedback", icon: feedback, route: "/" },
  ];

  const handleListItemClick = (index, item, menuType) => {
    if (menuType === "general") {
      setSelectedGeneralIndex(index);
      setSelectedOtherIndex(null); // Deselect the other menu
    } else if (menuType === "other") {
      setSelectedOtherIndex(index);
      setSelectedGeneralIndex(null); // Deselect the general menu
    }
  
    // Navigate to the route of the clicked item
    navigate(item.route); // Corrected: Navigate to the item's route
  };
  

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}
        sx={{ backgroundColor: "#FFFFFF", height: "84px" }}>
        <Toolbar >
          <IconButton
            color="black"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
            <div className='SearchApp'>
              <img
                className="searchIcon"
                src={search}
                alt="Search Icon"

              />
              <input
                className="search"
                id="search"
                placeholder="Search"

              />
              <img className="fimage" src={Frame} alt='Fimage' />

            </div>
            <div className='appbar2'>
              <img className="setting" src={setting} alt='setting' />
              <img className='notification' src={Notification} alt='notification' />
              <div className="vertical-line"></div>
              <img className='image' src={image} alt='Image' />
              <button className='switchWallet'> Switch Wallet</button>

            </div>
          </Toolbar>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant={isSmallScreen ? 'temporary' : 'persistent'} // Conditional variant
        anchor="left"
        open={open}
        onClose={handleDrawerClose}
      >
        <div className="SidebarContainer"> 
          <DrawerHeader>
          <img className='Web3Logo' src={web3Logo} alt='Logo' />
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          <div className='sidebar'>
            <div className="SideBarIcon">
              <Typography className='generalMenu'>GENERAL MENU</Typography>
              <List className="ListItems" disablePadding>
                {sidebarItems.map((item, index) => (
                  <ListItem key={item.text} disablePadding>
                    <ListItemButton
                    onClick={() => handleListItemClick(index, item, "general")} 
                      sx={{
                        "&:hover": {
                          backgroundColor: "#0F68FF",
                          borderRadius: "8px",
                        },
                        ...(selectedGeneralIndex === index && {
                          backgroundColor: "#0F68FF",
                          borderRadius: "8px",
                        }),
                      }}
                    >
                      <ListItemIcon>
                        <img src={item.icon} alt={`${item.text} Icon`} className="event-icon" />
                      </ListItemIcon>
                      <ListItemText
                        primary={item.text}
                        primaryTypographyProps={{
                          fontFamily: 'Montserrat',
                          fontWeight: 500,
                          fontSize: '14px',
                          lineHeight: '22.4px',
                          color: selectedGeneralIndex === index ? "white" : "#667085",
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </div>

            <div className="SideBarIcon2">
              <Typography className='generalMenu'>OTHER MENU</Typography>
              <List className="ListItems" disablePadding>
                {otherItems.map((item, index) => (
                  <ListItem key={item.text} disablePadding>
                    <ListItemButton
                  onClick={() => handleListItemClick(index, item, "other")}
                      sx={{
                        "&:hover": {
                          backgroundColor: "#0F68FF",
                          borderRadius: "8px",
                        },
                        ...(selectedOtherIndex === index && {
                          backgroundColor: "#0F68FF",
                          borderRadius: "8px",
                        }),
                      }}
                    >
                      <ListItemIcon>
                        <img src={item.icon} alt={`${item.text} Icon`} className="event-icon" />
                      </ListItemIcon>
                      <ListItemText
                        primary={item.text}
                        primaryTypographyProps={{
                          fontFamily: 'Montserrat',
                          fontWeight: 500,
                          fontSize: '14px',
                          lineHeight: '22.4px',
                          color: selectedOtherIndex === index ? "white" : "#667085",
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </div>
          </div>

        
          <div className='Logout'>
            <img src={logout} alt='logout' />
            <p>Logout</p>
          </div>
        </div>
      </Drawer>
      <Main open={open}  isSmallScreen={isSmallScreen} sx={{ backgroundColor: "#F9F9FC", width: "100%", marginTop:" 38px" }}>
        {children}
       
      </Main>
    </Box>
  );
}