const getMenu = async (token, username) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/menus?author=${username}`,
      {
        method: 'GET',
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

export default getMenu;
