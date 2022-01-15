import styles from './GroceryList.module.scss';
import Box from '@components/Box';
import checkGroceries from '@lib/checkGroceries';
import { useEffect, useState } from 'react';
import extractIngredients from './extractIngredients';
import SelectRecipe from './SelectRecipe';
import { GroceryListProps } from './types';
import { IRecipe } from '@interfaces/recipe';
import Button from '@components/Button';
import { IMenu } from '@interfaces/menu';

const GroceryList = ({
  menu,
  recipe,
  token,
  backButton,
  showList,
}: GroceryListProps) => {
  const [recipeId, setRecipeId] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState<IRecipe>();
  const [menuList, setMenuList] = useState<IMenu[]>([]);
  const [ingredients, setIngredients] = useState([]);

  const checkBoxOnChange = async (event, id) => {
    for (let r = 0; r < menuList.length; r++) {
      for (let i = 0; i < menuList[r].recipe.ingredients.length; i++) {
        if (
          (Array.isArray(id) &&
            (menuList[r].recipe.ingredients[i].id === id[0] ||
              menuList[r].recipe.ingredients[i].id === id[1])) ||
          menuList[r].recipe.ingredients[i].id === id
        ) {
          const newGroceries = [...menuList];
          newGroceries[r].recipe.ingredients[i] = {
            ...newGroceries[r].recipe.ingredients[i],
            checked: !newGroceries[r].recipe.ingredients[i].checked,
          };
          setMenuList(newGroceries);
        }
      }
    }
    if (Array.isArray(id)) {
      id.forEach(
        async ingredient =>
          await checkGroceries(ingredient, token, event.target.checked)
      );
    } else {
      await checkGroceries(id, token, event.target.checked);
    }
  };

  const selectRecipe = id => {
    setRecipeId(id);
    const foundRecipe = menu.find(item => item.recipe.id === parseInt(id));
    setSelectedRecipe(foundRecipe.recipe);
  };

  const resetRecipe = () => {
    setRecipeId('');
    setSelectedRecipe({ name: 'Alla recept' } as IRecipe);
  };

  const flattenAndSortIngredients = () => {
    if (recipeId) {
      const foundRecipe = menu.find(
        item => item.recipe.id === parseInt(recipeId)
      );
      setIngredients(extractIngredients(foundRecipe.recipe));
    } else {
      setIngredients(extractIngredients(menuList));
    }
  };

  useEffect(() => {
    setMenuList(menu);
    if (recipe) {
      setRecipeId(recipe);
      const foundRecipe = menu.find(
        item => item.recipe.id === parseInt(recipe)
      );
      setSelectedRecipe(foundRecipe.recipe);
    }
  }, [menu, recipe]);

  useEffect(() => {
    if (recipeId) {
      const foundRecipe = menu.find(
        item => item.recipe.id === parseInt(recipeId)
      );
      setIngredients(extractIngredients(foundRecipe.recipe));
    } else {
      const asyncFunction = async () => {
        const ingredientList = await extractIngredients(menuList);
        setIngredients(ingredientList);
      };
      asyncFunction();
    }
  }, [menu, menuList, recipeId]);

  const ingredientLiElements = ingredients.map(item => (
    <li key={item.id}>
      <input
        type='checkbox'
        id={item.id.toString()}
        onChange={event => checkBoxOnChange(event, item.id)}
        checked={item.checked}
      />
      <div className={styles.customCheckBox}></div>
      <label htmlFor={item.id.toString()}>
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
          <ul className={styles.groceryListUl}>{ingredientLiElements}</ul>
        </Box>
      </div>
    </>
  );
};

export default GroceryList;
