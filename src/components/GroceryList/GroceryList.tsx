import styles from './GroceryList.module.scss';
import Box from '@components/Box';
import checkGroceries from '@lib/checkGroceries';
import { useEffect, useState } from 'react';
import extractIngredients from './extractIngredients';
import SelectRecipe from './SelectRecipe';
import { GroceryListProps } from './types';
import { IRecipe } from '@interfaces/recipe';
import Button from '@components/Button';

const GroceryList = ({
  menu,
  recipe,
  token,
  backButton,
  showList,
}: GroceryListProps) => {
  const [groceries, setGroceries] = useState([]);
  const [recipeId, setRecipeId] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState<IRecipe>();

  const checkBoxOnChange = async (event, id) => {
    for (let i = 0; i < groceries.length; i++) {
      if (groceries[i].id === id) {
        const newGroceries = [...groceries];
        newGroceries[i] = {
          ...groceries[i],
          checked: !groceries[i].checked,
        };
        setGroceries(newGroceries);
      }
    }
    await checkGroceries(id, token, event.target.checked);
  };

  const selectRecipe = id => {
    setRecipeId(id);
  };

  const resetRecipe = () => {
    setSelectedRecipe({ name: 'Alla recept' } as IRecipe);
    setGroceries(extractIngredients(menu));
  };

  useEffect(() => {
    setGroceries(extractIngredients(menu));

    if (recipe) setRecipeId(recipe);
  }, [menu, recipe]);

  useEffect(() => {
    menu.forEach(item => {
      if (item.id === recipeId) {
        setGroceries(extractIngredients(item));
        setSelectedRecipe(item.recipe);
      }
    });
  }, [menu, recipeId]);

  const menuLiElements = groceries.map(item => (
    <li key={item.id}>
      <input
        type='checkbox'
        id={item.id}
        onChange={event => checkBoxOnChange(event, item.id)}
        checked={item.checked}
      />
      <div className={styles.customCheckBox}></div>
      <label htmlFor={item.id}>
        {item.amount} {item.metric} {item.name}
      </label>
    </li>
  ));

  return (
    <>
      <h1>Inköpslista</h1>
      {backButton && (
        <Button type='button' onClick={showList}>
          Tillbaka
        </Button>
      )}
      <div className={styles.groceryListWrapper}>
        <Box>
          <SelectRecipe
            menu={menu}
            recipe={selectedRecipe}
            setRecipe={selectRecipe}
            resetRecipe={resetRecipe}
          />
          <ul className={styles.groceryListUl}>{menuLiElements}</ul>
        </Box>
      </div>
    </>
  );
};

export default GroceryList;
