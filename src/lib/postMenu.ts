const postMenu = async (token: string, date: Date, recipe: number) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/menus`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        date: date,
        recipe: recipe,
      }),
    });

    if (response.status != 200) throw new Error();

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export default postMenu;
