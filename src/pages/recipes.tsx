import AddRecipeForm from '@components/AddRecipeForm';
import Layout from '@components/Layout';
import LoginForm from '@components/LoginForm';
import nookies from 'nookies';

const Recipes = ({ user, token }) => {
  return (
    <Layout isLoggedIn={user ? true : false}>
      {user ? <AddRecipeForm token={token} /> : <LoginForm />}
    </Layout>
  );
};

export const getServerSideProps = async ctx => {
  const cookies = nookies.get(ctx);
  let user = null;
  let token = null;

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

      const data = await response.json();

      user = data;
      token = cookies.jwt;
    } catch (error) {
      console.log(error);
    }
  }

  return {
    props: {
      user,
      token,
    },
  };
};

export default Recipes;
