import styles from './Recipe.module.scss';
import Box from '@components/Box';
import Button from '@components/Button';
import { RecipeProps } from './types';

const Recipe = ({ showList, recipe }: RecipeProps) => {
  return (
    <>
      <div className='row'>
        <h1>{recipe.name}</h1>
        <Button type='button' onClick={showList}>
          Tillbaka
        </Button>
      </div>
      <div className={styles.recipeWrapper}>
        <Box>
          <div className={styles.contentWrapper}>
            <div>
              <h2>
                {recipe.servings}{' '}
                {recipe.servings > 1 ? 'portioner' : 'portion'}
              </h2>
              <ul>
                {recipe.ingredients.map(ingredient => (
                  <li key={ingredient.name}>
                    {ingredient.amount} {ingredient.metric}{' '}
                    {ingredient.name.toLowerCase()}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2>Gör så här</h2>
              <pre>
                <p>{recipe.description}</p>
              </pre>
            </div>
          </div>
        </Box>
      </div>
    </>
  );
};

export default Recipe;
