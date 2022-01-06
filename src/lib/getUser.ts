const getUser = async cookies => {
  if (cookies?.jwt) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/me`,
        {
          headers: {
            Authorization: `Bearer ${cookies.jwt}`,
          },
        }
      );

      const userData = await response.json();

      return { user: userData, token: cookies.jwt };
    } catch (error) {
      console.log(error);
    }
  }
};

export default getUser;
