import { IIngredient } from '@interfaces/ingredient';
import { IMenu } from '@interfaces/menu';
import { IRecipe } from '@interfaces/recipe';

const extractIngredients = (menuItem: IRecipe | IMenu[]) => {
  let ingredientArray = [];
  let uniqueIngredients = [];

  //Grab ingredients only
  if (Array.isArray(menuItem)) {
    ingredientArray = menuItem.reduce((a, recipe) => {
      recipe.recipe.ingredients.forEach(item => {
        a.push(item);
      });
      return a;
    }, []);

    // Create new array and merge ingredient if it has the same metric
    ingredientArray.forEach((ingredient: IIngredient) => {
      if (Array.isArray(uniqueIngredients))
        uniqueIngredients.forEach((i, index) => {
          if (
            i.name === ingredient.name &&
            i.metric === ingredient.metric &&
            i.checked === ingredient.checked
          ) {
            ingredient = {
              ...ingredient,
              id: [ingredient.id, i.id],
              recipe: [ingredient.recipe, i.recipe],
              amount: parseInt(i.amount) + ingredient.amount,
            };
            uniqueIngredients.splice(index, 1);
          }
        });
      uniqueIngredients.push(ingredient);
    });
  } else {
    uniqueIngredients = menuItem.ingredients;
  }

  // Sort on category and name
  uniqueIngredients.sort(function (a, b) {
    if (a.category === b.category && a.name > b.name) {
      return 1;
    } else if (a.category === b.category && a.name < b.name) {
      return -1;
    } else if (a.category > b.category) {
      return 1;
    } else if (a.category < b.category) {
      return -1;
    }
  });

  return uniqueIngredients;
};

export default extractIngredients;
