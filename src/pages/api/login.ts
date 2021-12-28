import { setCookie } from 'nookies';

const login = async (req, res) => {
  const { identifier, password } = req.body;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/local`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ identifier, password }),
      }
    );

    const data = await response.json();

    if (!response.ok) throw new Error(data.error.message);

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

export default login;
