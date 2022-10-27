import { useQueries } from '@tanstack/react-query';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';
import PointText from '../components/Text/PointText';
import Text from '../components/Text/Text';
import Title from '../components/Text/Title';
import axiosInstance from '../utils/axios';
import classes from './savedMeals.module.scss';

export async function getSavedMeal({ queryKey }) {
  const { data } = await axiosInstance.get(`/lookup.php?i=${queryKey[1]}`);
  return data?.meals?.[0];
}
function SavedMeals() {
  const [savedMeals, setSavedMeals] = useState([]);
  useEffect(() => {
    if (localStorage.getItem('savedMeals')) {
      setSavedMeals(JSON.parse(localStorage.getItem('savedMeals')));
    }
  }, []);
  const queries = savedMeals.map((id) => ({
    queryKey: ['singleMeal', id],
    queryFn: getSavedMeal,

  }));
  const results = useQueries({
    queries,
  });

  return (
    <div className={classes.pageWrapper}>
      <Title variant="primary" className={classes.pageTitle}>
        My Saved Meal List
      </Title>
      <div className={classes.list_container}>
        {!savedMeals.length && <Text>You have no saved meals</Text>}
        {results.map(({ data, isLoading, isError }, index) => {
          if (isLoading) {
            return <BeatLoader key={index} color="#fff" />;
          }

          return (
            <Link href={`/meals/${data.idMeal}`} key={data.idMeal}>
              <a className={classes.singleMeal}>
                <Text variant="secondary" className={classes.mealTitle}>{data.strMeal}</Text>
                <PointText>
                  Category:
                  {' '}
                  {' '}
                  {data.strCategory}
                </PointText>
                <PointText>
                  Area:
                  {' '}
                  {' '}
                  {data.strArea}
                </PointText>

              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default SavedMeals;
