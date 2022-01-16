import GroceryList from '@components/GroceryList';
import Layout from '@components/Layout';
import LoginForm from '@components/LoginForm';
import Spinner from '@components/Spinner';
import generateMenu from '@lib/generateMenu';
import getUser from '@lib/getUser';
import { Router } from 'next/router';
import nookies from 'nookies';
import { useEffect, useState } from 'react';

const About = ({ user, menu, token }) => {
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
      {!loading && user && <GroceryList menu={menu} token={token} />}
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
      token,
    },
  };
};

export default About;
