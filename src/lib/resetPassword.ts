const resetPassword = async (
  code: string | string[],
  password: string,
  passwordConfirmation: string
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, password, passwordConfirmation }),
      }
    );

    return response;
  } catch (error) {
    console.log(error);
  }
};

export default resetPassword;
