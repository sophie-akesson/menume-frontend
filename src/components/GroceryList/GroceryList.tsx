import Box from '@components/Box';
import { useEffect, useState } from 'react';
import consolidateGroceries from './consolidateGroceries';
import { GroceryListProps } from './types';

const GroceryList = ({ menu, recipe }: GroceryListProps) => {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    menu && setIngredients(consolidateGroceries(menu));
    recipe && setIngredients(recipe.ingredients);
  }, [menu, recipe]);

  return (
    <>
      <h1>Inköpslista</h1>
      <Box>
        Select component here
        <ul>
          {ingredients.map((ingredient, index) => (
            <li key={`${ingredient.name}${index}`}>
              <input type='checkbox' id={`${ingredient.name}${index}`} />
              <label htmlFor={`${ingredient.name}${index}`}>
                {ingredient.amount} {ingredient.metric} {ingredient.name}
              </label>
            </li>
          ))}
        </ul>
      </Box>
    </>
  );
};

export default GroceryList;
