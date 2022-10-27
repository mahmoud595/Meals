import React from 'react';
import Text from '../Text/Text';
import Title from '../Text/Title';
import classes from './Ingredients.module.scss';

function Ingredients({ ingredientsMeasures }) {
  return (
    <>
      <Title className={classes.title}>Ingredients</Title>
      <table className={classes.ingredientsTable}>
        <tbody>
          {ingredientsMeasures.map((key, index) => (
            <tr key={index}>
              <td>
                <Text>{key.ingredients}</Text>
              </td>
              <td>
                <Text>{key.measures}</Text>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Ingredients;
