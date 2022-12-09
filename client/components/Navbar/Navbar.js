import * as React from "react";
import style from "./Navbar.module.css";
import logo from "./logo_white.png";
import cornerLogo from "./corner_logo_white.png";
import { connect } from "react-redux";
import { logout } from "../../store";
import history from "../../history";
import { Link } from "react-router-dom";

/// MUI ///
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AccountCircle from "@mui/icons-material/AccountCircle";

const pages = ["Home", "Prompts", "Leaderboard", "About"];
const settings = ["Profile", "Account"];

function Navbar(props) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { handleLogout, isLoggedIn } = props;

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
    <AppBar className={style.navbar} position="static">
      <Container maxWidth="xl" border-bottom="white">
        <Toolbar disableGutters>
          <img className={style.logo} src={cornerLogo} alt="lastword logo" />
          <Box
            className={style.navbar_links}
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
          >
            {pages.map((page) => (
              <a href={`/${page}`}>
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              </a>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="user avatar" sx={{ bgcolor: "transparent" }}>
                  <AccountCircle style={{ width: 50, height: 50 }} />
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <a href={`/${setting}`}>
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                </a>
              ))}
              {isLoggedIn ? (
                <MenuItem key={logout} onClick={handleLogout}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              ) : (
                <>
                  <a href="/login">
                    <MenuItem key="login" onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">Login</Typography>
                    </MenuItem>
                  </a>
                  <a href="/signup">
                    <MenuItem key="signup" onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">Sign Up</Typography>
                    </MenuItem>
                  </a>
                </>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
/**
import React from 'react';
import styles from './Navbar.module.css';
import { connect } from 'react-redux';
import { logout } from '../../store';
import history from '../../history';
import { Link } from 'react-router-dom';

function Navbar(props) {
const { handleLogout, isLoggedIn } = props;
return (
<nav className='navbar'>
<span className='logo'>LOGO</span>
      <ul className={'navbar_list'}>
        {isLoggedIn ? (
          <li className='navbar_list_item'>
            <button onClick={handleLogout}>Logout</button>
          </li>
        ) : (
          <>
            <li className='navbar_list_item'>
              <Link to='/login'>Login</Link>
            </li>
            <li className='navbar_list_item'>
              <Link to='/signup'>Sign Up</Link>
            </li>
          </>
        )}
        <li className='navbar_list_item'>
          <Link to='/prompts'>Prompts</Link>
        </li>
        <li className='navbar_list_item'>
          <Link to='/myprofile'>Profile</Link>
        </li>
        <li className='navbar_list_item'>
          <Link to='/leaderboard'>Leaderboard</Link>
        </li>
      </ul>
    </nav>
*/
//   );
// }
const mapNav = (state) => {
  return {
    name: "logout",
    displayName: "Logout",
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

/*
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Navbar() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const logoStyle = { width: 60, height: 60 };

  return (
    <nav
      className={styles.navbar}
      sx={({ flexDirection: "row" }, { justifyContent: "space-between" })}
    >
      <span className={styles.logo}>
        <img
          style={logoStyle}
          className={styles.logo}
          src={logo}
          alt="lastword logo"
        />
        <Box sx={({ width: "100%" }, { justifyContent: "flex-end" })}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs className={"tabs"} value={value} onChange={handleChange}>
              <LinkTab label="Home" href="/home" />
              <LinkTab label="Prompts" href="/promps" />
              <LinkTab label="Profile" href="/profile" />
            </Tabs>
          </Box>
        </Box>
      </span>
    </nav>
  );
}
*/
/*
import React from "react";
import styles from "./Navbar.module.css";
import { connect } from "react-redux";
import { logout } from "../../store";
import history from "../../history";
import { Link } from "react-router-dom";
*/
