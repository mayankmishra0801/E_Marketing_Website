import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { AccountCircle, Add, AddLocation, AddReaction, AddToHomeScreen, Bookmark, ContentCopy, Dashboard, Home, HomeMini, LocationCity, Paid, Payments, ProductionQuantityLimits, Shower, SmartDisplay, Visibility } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { Badge, Button, Fab, Grid, Menu, MenuItem, Tooltip } from '@mui/material';
import { db } from '../../firebase';
import { display } from '@mui/system';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));


const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

function Usernavbar() {

  var navi = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  var uid = localStorage.getItem('userlogin');
  console.log(uid);

  function logout() {
    localStorage.removeItem('userlogin');
    localStorage.removeItem('Uname')
    localStorage.removeItem('aid');
    navi('/');
  }
  React.useEffect(() => {
    if (!uid) {
      navi('/');
    }
  }, [])



  const [anchorEl, setAnchorEl] = React.useState(null);
  const open1 = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [allcat, setallcat] = React.useState([]);
  function getcat() {
    if(uid){
          db.collection('Category').onSnapshot((succ) => {
      var a = [];
      succ.forEach((succc) => {
        a.push(succc);
      })
      setallcat(a);
    })
  }
}


  React.useEffect(() => {
    getcat();
  }, [])

  var navi = useNavigate();

  function selccat(x) {
    navi('/Product?id=' + x);
  }

  function mycart() {
    navi('/Mycart')
  }
  

  
    var cart = db.collection('Uregister').doc(uid).collection('mycart');
  
  const [size, setsize] = React.useState([]);

  function Badgedata() {
if(uid){
    cart.onSnapshot((succ) => {

      var ar = [];
      succ.forEach((succc) => {
        ar.push(succc);
 })
      setsize(succ.size);
    })
  }
  }

  React.useEffect(() => {
    Badgedata();
  }, [])

  return (
    <>

      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Grid container>
          <Grid lg={12}>
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <Grid container>
              <Grid >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            </Grid>
              <Grid lg={8} md={8} sm={6}>
            <Typography variant="h6"  >
              Welcome
            </Typography>
            </Grid>

          <Grid lg={2} md={4} sm={3} >
            <select className='form-control' onChange={(e) => selccat(e.target.value)}>
              <option value={''}>Select Category</option>

              {allcat.map((row) => (
                <option value={row.data().CategoryName}>{row.data().CategoryName}</option>
              ))}

            </select>
            </Grid>
<Grid lg={1} md={1} sm={1}>
            <Button
              aria-controls={open1 ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open1 ? 'true' : undefined}
              onClick={handleClick}
              color="inherit"
            >
              <AccountCircle />&nbsp;&nbsp;{localStorage.getItem('Uname')}
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open1}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
</Grid>
</Grid>
          </Toolbar>
        </AppBar>
        </Grid>
        </Grid>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            <Link to="/Home" className="link">
              <ListItemButton

                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <Home />
                </ListItemIcon>
                <ListItemText primary='Home' sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </Link>

          </List>
          <Divider />
          <List>
          <Link to="/Orderlist" className="link">
            <ListItemButton

              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <Visibility />
              </ListItemIcon>
              <ListItemText primary='Orderlist' sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </Link>

        </List>



        <Divider/>
          
          
          <List>
            <Link to="/Address" className="link">
              <ListItemButton

                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <AddLocation />
                </ListItemIcon>
                <ListItemText primary='Address' sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </Link>
          </List>

        <Divider/>
          
          
          <List>
            <Link to="/Payment" className="link">
              <ListItemButton

                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <Paid/>
                </ListItemIcon>
                <ListItemText primary='Payment' sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </Link>
          </List>

       
          

        </Drawer>

        {uid && (
           <Tooltip arrow title='Mycart'>
          <Fab onClick={mycart} color="primary" style={{ position: 'fixed', right: '20px', bottom: '20px' }}>
            <Badge badgeContent={size} color='secondary'>
             
              <ProductionQuantityLimits />
             
            </Badge>
          </Fab>
          </Tooltip>
        )}



      </Box>

    </>
  )

}
export default Usernavbar;

