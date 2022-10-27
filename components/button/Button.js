import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import classes from './Button.module.scss';

function ButtonWithLink({ link = '/', children, variant = 'secondary' }) {
  return (
    <Link href={link}>
      <a className={clsx(classes.button, classes[`variant__${variant}`])}>
        {children}
      </a>
    </Link>
  );
}

export function Button({
  children, variant = 'secondary', onClick, className,
}) {
  return (
    <button type="button" onClick={onClick} className={clsx(classes.button, classes[`variant__${variant}`], className)}>
      {children}

    </button>
  );
}
export default ButtonWithLink;
