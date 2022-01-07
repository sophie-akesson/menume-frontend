import nookies from 'nookies';
import WeeklyMenu from '@components/WeeklyMenu';
import LoginForm from '@components/LoginForm';
import Layout from '@components/Layout';
import getUser from '@lib/getUser';
import Box from '@components/Box';
import Button from '@components/Button';
import router, { Router } from 'next/router';
import Spinner from '@components/Spinner';
import { useEffect, useState } from 'react';
import generateMenu from '@lib/generateMenu';

const Home = ({ user, menu }) => {
  const { username } = user || {};
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);
    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', end);
    };
  }, []);

  return (
    <Layout isLoggedIn={user ? true : false}>
      {!loading && !user && <LoginForm />}
      {!loading && user && typeof menu === 'string' && (
        <>
          <h1>Ingen meny</h1>
          <Box>
            <p>{menu}</p>
            <div>
              <Button
                type='button'
                onClick={() => {
                  router.replace('/recipes');
                }}
              >
                Mina recept
              </Button>
            </div>
          </Box>
        </>
      )}
      {!loading && user && typeof menu !== 'string' && (
        <WeeklyMenu name={username} menu={menu} />
      )}
      {loading && <Spinner />}
    </Layout>
  );
};

export const getServerSideProps = async ctx => {
  const cookies = nookies.get(ctx);
  let user = null;
  let menu = null;
  let token = null;

  const UserResponse = await getUser(cookies);

  if (UserResponse) {
    user = UserResponse.user;
    token = UserResponse.token;

    try {
      menu = await generateMenu(token, user.username);
    } catch (error) {
      console.log(error);
    }
  }

  return {
    props: {
      user,
      menu,
    },
  };
};

export default Home;
