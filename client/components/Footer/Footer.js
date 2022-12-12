import * as React from 'react';
import style from './Footer.module.css';
import logo from './corner_logo_white.png';
import cornerLogo from './corner_logo_white.png';
import { connect, useDispatch, useSelector } from 'react-redux';
import history from '../../history';
import { Link } from 'react-router-dom';

function Footer(props) {
  return (
    <div className={style.footer}>
      <div>
        <img className={style.logo} src={cornerLogo} alt='lastword logo' />
      </div>
    </div>
  );
}

export default Footer;
