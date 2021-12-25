import router from 'next/router';

const logout = async () => {
  try {
    await fetch('/api/logout');
    router.push('/');
  } catch (error) {
    console.log(error);
  }
};

export default logout;
