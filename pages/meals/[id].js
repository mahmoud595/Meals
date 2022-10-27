import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import BeatLoader from 'react-spinners/BeatLoader';
import { FaHeart, FaHeartBroken } from 'react-icons/fa';
import Image from 'next/image';
import toast from 'react-hot-toast';
import axiosInstance from '../../utils/axios';
import classes from './meals.module.scss';
import Text from '../../components/Text/Text';
import Title from '../../components/Text/Title';
import PointText from '../../components/Text/PointText';
import Ingredients from '../../components/Ingredients/Ingredients';
import { Button } from '../../components/button/Button';

const getSingleMeal = async ({ queryKey }) => {
  const { data } = await axiosInstance.get(`/lookup.php?i=${queryKey[1]}`);
  return data?.meals?.[0];
};
function SingleMeal() {
  const [isSaved, setIsSaved] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const {
    data = {}, isLoading, isError, error,
  } = useQuery(['singleMeal', id], getSingleMeal);
  useEffect(() => {
    const savedMeals = localStorage.getItem('savedMeals');
    if (savedMeals) {
      if (JSON.parse(savedMeals).includes(id)) {
        setIsSaved(true);
      } else {
        setIsSaved(false);
      }
    }
  }, [id]);

  const ingredients = Object.keys(data).filter((key) => key.startsWith('strIngredient')).filter((key) => data[key] !== '' && data[key] !== null);
  const ingredientsMeasures = ingredients.map((key, index) => ({
    index: index + 1,
    ingredients: data[key],
    measures: data[`strMeasure${index + 1}`],
  }));

  const handleSaveMeal = () => {
    const savedMeals = localStorage.getItem('savedMeals');
    if (!savedMeals) {
      localStorage.setItem('savedMeals', JSON.stringify([id]));
      setIsSaved(true);
      toast.success('Meal is saved successfully');
    } else if (savedMeals.includes(id)) {
      const newSaved = [...JSON.parse(savedMeals)];

      newSaved.splice(newSaved.indexOf(id), 1);
      localStorage.setItem('savedMeals', JSON.stringify(newSaved));
      setIsSaved(false);

      toast.error('Meal is removed successfully');
    } else {
      const newSaved = [...JSON.parse(savedMeals)];
      newSaved.push(id);
      localStorage.setItem('savedMeals', JSON.stringify(newSaved));
      setIsSaved(true);

      toast.success('Meal is saved successfully');
    }
  };
  if (isError) {
    return (
      <Text>
        Error :
        $
        {error.message}
      </Text>
    );
  }
  if (isLoading) return <BeatLoader color="#fff" />;
  return (
    <div className={classes.pageWrapper}>
      <div className={classes.topContainer}>
        <Image src={data.strMealThumb} width={300} height={300} alt={data.strMeal} />
        <div className={classes.info}>
          <Title variant="primary">
            {data.strMeal}
          </Title>
          <PointText className={classes.infoText}>
            Category :
            {' '}
            {data.strCategory}
          </PointText>
          <PointText className={classes.infoText}>
            Area :
            {' '}
            {data.strArea}
          </PointText>
          <PointText className={classes.infoText}>
            Tags :
            {' '}
            {data.strTags}
          </PointText>
          {isSaved && <Text className={classes.greenText}>You already Saved the meal</Text>}
          <Button variant="primary" onClick={handleSaveMeal} className={classes.saveButton}>
            {isSaved ? (
              <>
                <FaHeartBroken className={classes.saveIcon} />
                {' '}
                Remove
              </>

            ) : (
              <>

                <FaHeart className={classes.saveIcon} />
                {' '}
                Save
              </>
            )}
          </Button>

        </div>
      </div>
      <div className={classes.ingredientsTable}>
        <Ingredients ingredientsMeasures={ingredientsMeasures} />
      </div>
      <div className={classes.instructions}>
        <Title>Instructions</Title>
        {data.strInstructions.split('.').filter((sentence) => sentence !== '').map((instruction, index) => (
          <PointText key={index}>{instruction}</PointText>
        ))}
      </div>
    </div>
  );
}

export default SingleMeal;
