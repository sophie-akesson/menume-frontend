const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      }
    );

    const data = await response.json();

    if (!response.ok) throw new Error(data.error.message);

    res.status(200).end();
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

export default forgotPassword;
