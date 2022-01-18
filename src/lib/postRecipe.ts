import { IIngredient } from '@interfaces/ingredient';

const postRecipe = async (
  name: string,
  servings: string,
  ingredients: IIngredient[],
  description: string,
  token: string
) => {
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
