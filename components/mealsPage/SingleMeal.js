import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import classes from './SingleMeal.module.scss';
import Text from '../Text/Text';

function SingleMeal({ meal }) {
  return (
    <Link href={`/meals/${meal.idMeal}`}>
      <a className={classes.item}>
        <Image src={meal.strMealThumb} width={200} height={200} alt={meal.strMeal} placeholder="blur" blurDataURL="/images/placeholder.png" />
        <Text>{meal.strMeal}</Text>
      </a>
    </Link>
  );
}

export default SingleMeal;
