import Box from '@components/Box';
import checkGroceries from '@lib/checkGroceries';
import { useEffect, useState } from 'react';
import extractIngredients from './extractIngredients';
import consolidateGroceries from './extractIngredients';
import { GroceryListProps } from './types';

const GroceryList = ({ menu, recipe, token }: GroceryListProps) => {
  const [groceries, setGroceries] = useState([]);

  const checkBoxOnChange = async (recipe, ingredient, checked) => {
    try {
      const response = await checkGroceries(recipe, ingredient, checked, token);

      if (response.status != 200) throw new Error();
    } catch (error) {
      console.log(error);
    }
  };

  const rearrangeData = () => {
    return menu.map(recipe => {
      const ingredients = recipe.recipe.ingredients.map((ingredient, index) => {
        const ingredientObject = {
          name: ingredient.name,
          category: ingredient.category,
          amount: ingredient.amount,
          metric: ingredient.metric,
          recipe: ingredient.checked ? ingredient.checked : false,
        };
        return ingredientObject;
      });
      return ingredients;
    });
  };

  useEffect(() => {
    setGroceries(extractIngredients(menu));
  }, [menu]);

  const liElements = groceries.map((item, index) => (
    <li key={`${item.name}${index}`}>
      <input type='checkbox' id={`${item.name}${index}`} />
      <label htmlFor={`${item.name}${index}`}>
        {item.amount} {item.metric} {item.name}
      </label>
    </li>
  ));

  return (
    <>
      <h1>Inköpslista</h1>
      <Box>
        Select element here
        <ul>{liElements}</ul>
      </Box>
    </>
  );
};

export default GroceryList;
