const checkGrocery = async (id: number, token: string, checked: boolean) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/ingredients/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          checked: checked,
        }),
      }
    );

    if (response.status != 200) throw new Error();

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export default checkGrocery;
