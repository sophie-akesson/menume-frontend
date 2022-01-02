import { setCookie } from 'nookies';

const register = async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/local/register`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      }
    );

    const data = await response.json();

    if (response.status != 200) throw new Error(data.message[0].messages[0].id);

    setCookie({ res }, 'jwt', data.jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });

    res.status(200).end();
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

export default register;
