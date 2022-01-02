const addRecipe = async (req, res) => {
  const { name, servings, ingredients, description, token } = req.body;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.token}`,
      },
      body: JSON.stringify({
        name: name,
        servings: servings,
        ingredients: ingredients,
        description: description,
      }),
    });

    const data = await response.json();

    if (response.status != 200) throw new Error(data.message[0].messages[0].id);

    res.status(200).end();
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

export default addRecipe;
