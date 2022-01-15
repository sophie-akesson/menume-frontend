const deleteRecipe = async (token, username, id) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/recipes/${id}?author.username=${username}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
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

export default deleteRecipe;
