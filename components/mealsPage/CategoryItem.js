import clsx from 'clsx';
import React from 'react';
import classes from './CategoryItem.module.scss';

function CategoryItem({
  category, selected, clickHandler,
}) {
  const isSelected = selected === category.strCategory;
  return (
    <button type="button" className={clsx(classes.item, isSelected && classes.item__selected)} onClick={clickHandler}>
      {category.strCategory}
    </button>
  );
}

export default CategoryItem;
