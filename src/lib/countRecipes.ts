const countRecipes = async (token, username) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/recipes/count?author.username=${username}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status != 200) throw new Error();

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export default countRecipes;
