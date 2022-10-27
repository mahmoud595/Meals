import clsx from 'clsx';
import React from 'react';
import classes from './PointText.module.scss';
import Text from './Text';

function PointText({ children, className }) {
  return (
    <div className={clsx(classes.pointText, className)}>
      <div className={classes.circle} />
      <Text>{children}</Text>
    </div>
  );
}

export default PointText;
