import Box from '@components/Box';
import checkGroceries from '@lib/checkGroceries';
import { useEffect, useState } from 'react';
import extractIngredients from './extractIngredients';
import SelectRecipe from './SelectRecipe';
import { GroceryListProps } from './types';

const GroceryList = ({ menu, recipe, token }: GroceryListProps) => {
  const [groceries, setGroceries] = useState([]);

  const checkBoxOnChange = async (event, id) => {
    try {
      const response = await checkGroceries(id, token, event.target.checked);

      if (response.status != 200) throw new Error();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setGroceries(extractIngredients(menu));
  }, [menu]);

  const liElements = groceries.map(item => (
    <li key={item.id}>
      <input
        type='checkbox'
        id={item.id}
        onChange={event => checkBoxOnChange(event, item.id)}
      />
      <label htmlFor={item.id}>
        {item.amount} {item.metric} {item.name}
      </label>
    </li>
  ));

  return (
    <>
      <h1>Inköpslista</h1>
      <Box>
        <SelectRecipe />
        <ul>{liElements}</ul>
      </Box>
    </>
  );
};

export default GroceryList;
