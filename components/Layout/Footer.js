import React from 'react';
import Image from 'next/image';
import classes from './Footer.module.scss';
import logo from '../../public/images/logo2.png';
import Text from '../Text/Text';

function Footer() {
  return (
    <footer className={classes.footer}>

      <Image src={logo} placeholder="blur" alt="menu logo" />
      <Text>Find the perfect meal recipe for you</Text>
      <p className={classes.copyright}>© “My-Meals” 2022 All right reserved.</p>
    </footer>
  );
}

export default Footer;
