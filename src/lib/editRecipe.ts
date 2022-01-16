const editRecipe = async (
  id,
  name,
  servings,
  ingredients,
  description,
  token
) => {
  try {
    //Rename ingredientId key to id
    const newIngredients = ingredients.map(({ ingredientId: id, ...rest }) => ({
      id,
      ...rest,
    }));

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/recipes/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: name,
          servings: parseInt(servings),
          ingredients: newIngredients,
          description: description,
        }),
      }
    );

    return response;
  } catch (error) {
    console.log(error);
  }
};

export default editRecipe;
