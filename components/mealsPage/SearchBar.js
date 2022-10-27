import React from 'react';
import classes from './SearchBar.module.scss';

function SearchBar({ searchValue, setSearchValue }) {
  return (
    <input
      className={classes.input}
      value={searchValue}
      onChange={(e) => {
        setSearchValue(e.target.value);
      }}
      placeholder="Search Meals"
    />
  );
}

export default SearchBar;
