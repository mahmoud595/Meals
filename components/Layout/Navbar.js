import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import classes from './Navbar.module.scss';
import logo from '../../public/images/logo.png';

function Navbar() {
  return (
    <nav className={classes.navbar}>
      <Link href="/">
        <a className={classes.logo}>
          <Image src={logo} placeholder="blur" alt="menu" />
        </a>
      </Link>
      <ul className={classes.navLinks}>
        <li>

          <Link href="/meals">
            <a>
              Meals
            </a>
          </Link>

        </li>
        <li>
          <Link href="/savedMeals">
            <a>
              Saved List
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
