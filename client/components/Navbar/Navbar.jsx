import React from 'react'
import styles from "./Navbar.module.css"
function Navbar() {
  return (
      <nav className={styles.navbar}>
          <span className={styles.logo}>LOGO</span>
          <ul className={styles.navbar_list}>
              <li className='navbar_list_item'>
                  <p>Home</p>
              </li>
              <li className='navbar_list_item'>
                  <p>Home</p>
              </li>
              <li className='navbar_list_item'>
                  <p>Profile <span>R</span></p>
              </li>
          </ul>
    </nav>
  )
}

export default Navbar