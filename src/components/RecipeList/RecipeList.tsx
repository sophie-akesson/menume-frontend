import styles from './RecipeList.module.scss';
import Box from '@components/Box';
import Button from '@components/Button';
import Cross from '@assets/icons/cross.svg';
import { RecipeListProps } from './types';
import { useState } from 'react';
import RemoveDialog from './RemoveDialog';
import deleteRecipe from '@lib/deleteRecipe';

const RecipeList = ({
  recipes,
  showAddRecipeForm,
  setShowRecipe,
  setRecipeList,
  token,
  username,
}: RecipeListProps) => {
  const [showDialog, setShowDialog] = useState({ show: false, id: 0 });

  const removeRecipe = async (token, username, id) => {
    const data = await deleteRecipe(token, username, id);

    setRecipeList(data);
  };

  return (
    <>
      <h1>Dina recept</h1>
      <Button type='button' onClick={showAddRecipeForm}>
        Lägg till recept
      </Button>
      <div className={styles.recipesWrapper}>
        {recipes.map(recipe => (
          <Box key={recipe.id} width='var(--size335)'>
            {showDialog.show && showDialog.id === recipe.id ? (
              <RemoveDialog
                id={recipe.id}
                setShowDialog={setShowDialog}
                removeRecipe={() => removeRecipe(token, username, recipe.id)}
              />
            ) : (
              <>
                <div className={styles.recipeRow}>
                  <h2>{recipe.name}</h2>
                  <button
                    onClick={() => setShowDialog({ show: true, id: recipe.id })}
                  >
                    <Cross />
                  </button>
                </div>
                <div className='buttonWrapper'>
                  <Button
                    type='button'
                    orientation='left'
                    onClick={() => setShowRecipe(recipe)}
                  >
                    Visa
                  </Button>
                  <Button type='button' orientation='right'>
                    Ändra
                  </Button>
                </div>
              </>
            )}
          </Box>
        ))}
      </div>
    </>
  );
};

export default RecipeList;
