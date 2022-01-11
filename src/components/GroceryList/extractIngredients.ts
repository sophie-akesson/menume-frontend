const extractIngredients = menu => {
  //Grab ingredients only
  const ingredientArray = menu.reduce((a, recipe) => {
    recipe.recipe.ingredients.forEach(item => {
      const ingredientObject = {
        name: item.name,
        category: item.category,
        amount: item.amount,
        metric: item.metric,
        recipe: recipe.recipe.id,
        checked: item.checked ? item.checked : false,
      };
      a.push(ingredientObject);
    });
    return a;
  }, []);

  //Create new array and sum the ingredient if it has the same metric
  let uniqueIngredients = [];

  ingredientArray.forEach(ingredient => {
    uniqueIngredients.length &&
      uniqueIngredients.forEach(i => {
        if (i.name === ingredient.name && i.metric === ingredient.metric) {
          const newAmount = i.amount + ingredient.amount;
          i.amount = newAmount;
        }
      });

    uniqueIngredients.push(ingredient);
  });

  //Sort on category and name
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
