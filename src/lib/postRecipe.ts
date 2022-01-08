const postRecipe = async (name, servings, ingredients, description, token) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name,
        servings: parseInt(servings),
        ingredients: ingredients,
        description: description,
      }),
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};

export default postRecipe;
