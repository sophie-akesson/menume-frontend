const extractIngredients = menuItem => {
  let ingredientArray = [];
  let uniqueIngredients = [];

  //Grab ingredients only
  if (menuItem.length) {
    ingredientArray = menuItem.reduce((a, recipe) => {
      recipe.recipe.ingredients.forEach(item => {
        a.push(item);
      });
      return a;
    }, []);

    // Create new array and merge ingredient if it has the same metric
    ingredientArray.forEach(ingredient => {
      if (uniqueIngredients.length)
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
              amount: parseInt(i.amount) + parseInt(ingredient.amount),
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
