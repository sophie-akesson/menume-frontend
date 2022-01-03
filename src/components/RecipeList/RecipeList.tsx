import styles from './RecipeList.module.scss';
import Box from '@components/Box';
import Button from '@components/Button';
import Cross from '@assets/icons/cross.svg';
import { RecipeListProps } from './types';

const RecipeList = ({ recipes, showAddRecipeForm }: RecipeListProps) => {
  return (
    <>
      <h1>Dina recept</h1>
      <Button onClick={showAddRecipeForm}>Lägg till recept</Button>
      <div className={styles.recipesWrapper}>
        {recipes.map(recipe => (
          <Box key={recipe.id} width='var(--size335)'>
            <div className={styles.recipeRow}>
              <h2>{recipe.name}</h2>
              <Cross />
            </div>
            <div className='buttonWrapper'>
              <Button orientation='left'>Visa</Button>
              <Button orientation='right'>Ändra</Button>
            </div>
          </Box>
        ))}
      </div>
    </>
  );
};

export default RecipeList;
