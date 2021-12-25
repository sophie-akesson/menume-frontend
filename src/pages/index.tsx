import WeeklyMenu from '@components/WeeklyMenu';
import LoginForm from '@components/LoginForm';
import Layout from '@components/Layout';
import nookies from 'nookies';

const Home = ({ user }) => {
  const { username } = user || {};

  return (
    <Layout isLoggedIn={user ? true : false}>
      {user ? <WeeklyMenu name={username} /> : <LoginForm />}
    </Layout>
  );
};

export const getServerSideProps = async ctx => {
  const cookies = nookies.get(ctx);
  let user = null;

  if (cookies?.jwt) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/me`,
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

export default Home;
