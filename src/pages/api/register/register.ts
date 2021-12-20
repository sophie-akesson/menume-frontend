import { setCookie } from 'nookies';

const Register = async (req, res) => {
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

    res.status(200).end();
  } catch (error) {
    res.status(400).send(error.response.data.message[0].messages[0]);
  }
};

export default Register;
