import AddRecipeForm from '@components/AddRecipeForm';
import Layout from '@components/Layout';
import LoginForm from '@components/LoginForm';
import nookies from 'nookies';

const Recipes = ({ user }) => {
  return (
    <Layout isLoggedIn={user ? true : false}>
      {user ? <AddRecipeForm /> : <LoginForm />}
    </Layout>
  );
};

export const getServerSideProps = async ctx => {
  const cookies = nookies.get(ctx);
  let user = null;

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
    } catch (error) {
      console.log(error);
    }
  }

  return {
    props: {
      user,
    },
  };
};

export default Recipes;
