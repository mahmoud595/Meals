import clsx from 'clsx';
import React from 'react';
import classes from './Text.module.scss';

function Text({ children, className }) {
  return (
    <div className={clsx(classes.text, className)}>{children}</div>
  );
}

export default Text;
