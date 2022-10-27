import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';
import axiosInstance from '../../utils/axios';
import Categories from '../../components/mealsPage/Categories';
import SearchBar from '../../components/mealsPage/SearchBar';
import SingleMeal from '../../components/mealsPage/SingleMeal';
import PointText from '../../components/Text/PointText';
import classes from './meals.module.scss';

const getCategories = async () => {
  const { data: { categories } } = await axiosInstance.get('/categories.php');
  return categories;
};
const searchForMeals = async ({ queryKey }) => {
  const { data: { meals: searchedMeals } } = await axiosInstance.get(`search.php?s=${queryKey[1]}`);
  return searchedMeals;
};
const getMeals = async ({ queryKey }) => {
  const { data: { meals } } = await axiosInstance.get(`/filter.php?c=${queryKey[1]}`);
  return meals;
};
const loadingStyle = {
  display: 'inline-block',
  margin: '0 auto',
};

function Meals() {
  const [selectedCategory, setSelectedCategory] = useState();
  const [searchMeals, setSearchMeals] = useState('');
  const [searchQuery, setsearchQuery] = useState('');
  const { data: categories, isLoading: categoriesIsLoading, isError: categoriesIsError } = useQuery(['categories'], getCategories);
  const { data: meals, isLoading: mealsIsLoading, isError: mealsIsError } = useQuery(
    ['mealsCategory', selectedCategory],
    getMeals,
    { enabled: searchQuery === '' },
  );
  const { data: searchedMeals, isLoading: searchedMealsIsLoading, isError: searchedMealsIsError } = useQuery(
    ['searchedMeal', searchQuery],
    searchForMeals,
    { enabled: searchQuery !== '' },
  );
  useEffect(() => {
    if (categories) {
      setSelectedCategory(categories[0].strCategory);
    }
  }, [categories]);
  useEffect(() => {
    const timeout = setTimeout(
      () => {
        if (searchMeals) {
          setSelectedCategory(null);
          setsearchQuery(searchMeals);
        } else {
          setsearchQuery('');
          if (categories) {
            setSelectedCategory(categories[0].strCategory);
          }
        }
      },
      300,
    );
    return () => {
      setsearchQuery('');
      clearTimeout(timeout);
    };
  }, [categories, searchMeals]);
  return (
    <div className={classes.meals__page}>
      <SearchBar searchValue={searchMeals} setSearchValue={setSearchMeals} />
      <PointText className={classes.text}>search meals or select categories from below.</PointText>
      <Categories
        categories={categories}
        isLoading={categoriesIsLoading}
        isError={categoriesIsError}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        setsearchQuery={setsearchQuery}
      />
      {(mealsIsLoading || categoriesIsLoading) && (
        <div className={classes.loadingSpinner}>

          <BeatLoader loading={mealsIsLoading || categoriesIsLoading} size={20} cssOverride={loadingStyle} color="#fff" />
        </div>
      )}
      <div className={classes.meals__container}>

        {!mealsIsError && !mealsIsLoading && meals && meals.map((meal) => (
          <SingleMeal meal={meal} key={meal.idMeal} />
        )) }
        {!searchedMealsIsError && !searchedMealsIsLoading && searchedMeals && searchedMeals.map((meal) => (
          <SingleMeal meal={meal} key={meal.idMeal} />
        )) }
      </div>
    </div>
  );
}

export default Meals;
