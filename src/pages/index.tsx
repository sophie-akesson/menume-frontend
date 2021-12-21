import Head from 'next/head';
import WeeklyMenu from '@components/WeeklyMenu';
import Link from 'next/link';
import Login from '@components/Login';
import Layout from '@components/Layout';
import nookies from 'nookies';
import router from 'next/router';

const Home = ({ user }) => {
  const { username } = user || {};

  const logout = async () => {
    try {
      await fetch('/api/logout');
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>MenuMe - Home</title>
        <meta
          name='description'
          content='Fill in your favourite recipes and get your weekly menu.'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <header>
        <Link href='/'>
          <a>MenuMe</a>
        </Link>
        {user && (
          <button
            type='button'
            onClick={(event: React.MouseEvent<HTMLInputElement>) => {
              logout();
            }}
          >
            Sign Out
          </button>
        )}
      </header>
      <Layout>{user ? <WeeklyMenu name={username} /> : <Login />}</Layout>
    </>
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
