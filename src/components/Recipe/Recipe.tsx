import styles from './Recipe.module.scss';
import Box from '@components/Box';
import Button from '@components/Button';
import { RecipeProps } from './types';

const Recipe = ({ showList, recipe }: RecipeProps) => {
  return (
    <>
      <h1>{recipe.name}</h1>
      <Button type='button' onClick={showList}>
        Tillbaka
      </Button>
      <div className={styles.recipeWrapper}>
        <Box>
          <h2>
            {recipe.servings} {recipe.servings > 1 ? 'portioner' : 'portion'}
          </h2>
          <ul>
            {recipe.ingredients.map(ingredient => (
              <li key={ingredient.name}>
                {ingredient.amount} {ingredient.metric} {ingredient.name}
              </li>
            ))}
          </ul>
          <h2>Gör så här</h2>
          <pre>
            <p>{recipe.description}</p>
          </pre>
        </Box>
      </div>
    </>
  );
};

export default Recipe;
