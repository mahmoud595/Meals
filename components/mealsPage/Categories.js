import React, { useCallback } from 'react';
import { BeatLoader } from 'react-spinners';
import classes from './Categories.module.scss';
import CategoryItem from './CategoryItem';

function Categories({
  categories, isLoading, isError, selectedCategory, setSelectedCategory, setsearchQuery,
}) {
  const handleClick = (id) => {
    setSelectedCategory(id);
    setsearchQuery('');
  };
  if (isLoading) return <BeatLoader color="#fff" />;
  if (isError) { console.log('error'); }

  return (
    <div className={classes.categories__container}>
      {!!categories.length && categories.map((item) => (
        <CategoryItem
          key={item.idCategory}
          category={item}
          selected={selectedCategory}
          clickHandler={() => handleClick(item.strCategory)}
        />
      ))}
    </div>
  );
}

export default Categories;
