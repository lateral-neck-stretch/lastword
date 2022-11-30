import React from 'react'
import styles from "./Navbar.module.css"
import { connect } from "react-redux";
import { logout } from '../../store';
import history from '../../history';
import { Link } from "react-router-dom";
function Navbar(props) {
    const { handleLogout, isLoggedIn } = props;
    return (
        <nav className={styles.navbar}>
            <span className={styles.logo}>LOGO</span>
            <ul className={styles.navbar_list}>
                {isLoggedIn ? (
                    <li className='navbar_list_item'>
                        <button onClick={handleLogout}>Logout</button>
                    </li>) : (
                    <li className='navbar_list_item'>
                        <Link to="/login">Login</Link>
                    </li>
                )
                }
                <li className='navbar_list_item'>
                    <p>Profile <span>R</span></p>
                </li>
            </ul>
        </nav>
    )
}
const mapNav = state => {
    return {
        name: "logout",
        displayName: "Logout",
        isLoggedIn: !!state.auth.id,
    }
}
const mapDispatch = dispatch => {
    return {
        handleLogout(evt) {
            evt.preventDefault();
            dispatch(logout());
            history.push("/LandingPage");
        }
    }
}
const NavbarConnected = connect(mapNav, mapDispatch)(Navbar);
export default NavbarConnected;