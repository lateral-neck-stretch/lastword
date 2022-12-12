import * as React from 'react';
import style from './Navbar.module.css';
import logo from './logo_white.png';
import cornerLogo from './corner_logo_white.png';
import { connect, useDispatch, useSelector } from 'react-redux';
import { fetchSingleUser, singleUser } from '../../store/user';
import { logout } from '../../store';
import history from '../../history';
import { Link } from 'react-router-dom';

/// MUI ///
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AccountCircle from '@mui/icons-material/AccountCircle';

const pages = ['Home', 'Prompts', 'About'];
const settings = ['Profile', 'Account'];

function Navbar(props) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { handleLogout, isLoggedIn } = props;

  const dispatch = useDispatch();
  const token = window.localStorage.getItem('token');
  const { userReducer } = useSelector((state) => state);
  const { userAvatar } = userReducer;
  React.useEffect(() => {
    if (token) {
      dispatch(fetchSingleUser(token));
    } else dispatch(singleUser({}));
  }, [isLoggedIn]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (page) => {
    console.log(page);
    window.location.href = `/${page}`;
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <AppBar className={style.navbar} position='static'>
      <Container maxWidth='xl' border-bottom='white'>
        <Toolbar disableGutters>
          <img className={style.logo} src={cornerLogo} alt='lastword logo' />
          <Box
            className={style.navbar_links}
            sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
          >
            {pages.map((page, idx) => (
              <a href={page == 'Home' ? '/' : `/${page}`} key={idx}>
                <Button
                  key={page.id}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              </a>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title='Open settings'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  src={userAvatar}
                  alt='user avatar'
                  sx={{ bgcolor: 'white' }}
                >
                  <AccountCircle style={{ width: 50, height: 50 }} />
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <div key='user_droplist'>
                <a href='/myprofile'>
                  <MenuItem key='myprofile' onClick={handleCloseUserMenu}>
                    <Typography textAlign='center'>My Profile</Typography>
                  </MenuItem>
                </a>
                {isLoggedIn ? (
                  <MenuItem key={logout} onClick={handleLogout}>
                    <Typography textAlign='center'>Logout</Typography>
                  </MenuItem>
                ) : (
                  <>
                    <a href='/login'>
                      <MenuItem key='login' onClick={handleCloseUserMenu}>
                        <Typography textAlign='center'>Login</Typography>
                      </MenuItem>
                    </a>
                    <a href='/signup'>
                      <MenuItem key='signup' onClick={handleCloseUserMenu}>
                        <Typography textAlign='center'>Sign Up</Typography>
                      </MenuItem>
                    </a>
                  </>
                )}
              </div>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
const mapNav = (state) => {
  return {
    name: 'logout',
    displayName: 'Logout',
    isLoggedIn: !!state.auth.id,
  };
};
const mapDispatch = (dispatch) => {
  return {
    handleLogout(evt) {
      evt.preventDefault();
      dispatch(logout());
    },
  };
};
const NavbarConnected = connect(mapNav, mapDispatch)(Navbar);
export default NavbarConnected;
