import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import style from "./Navbar.module.css";
import logo from "./logo_white.png";
import { connect } from "react-redux";
import { logout } from "../../store";
import history from "../../history";
import { Link } from "react-router-dom";

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

function Navbar(props) {
  const { handleLogout, isLoggedIn } = props;
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const logoStyle = { width: 60, height: 60 };

  return (
    <nav
      className={style.navbar}
      sx={({ flexDirection: "row" }, { justifyContent: "space-between" })}
    >
      {/*/// NAVBAR LOGO ///*/}

      <span>
        <img className={style.logo} src={logo} alt="lastword logo" />
        {isLoggedIn ? (
          <li className="navbar_list_item">
            <button onClick={handleLogout}>Logout</button>
          </li>
        ) : (
          <li className="navbar_list_item">
            <Link to="/login">Login</Link>
          </li>
        )}
        <Box sx={({ width: "100%" }, { justifyContent: "flex-end" })}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={value} onChange={handleChange}>
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
      history.push("/LandingPage");
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
