import Box from '@components/Box';
import Button from '@components/Button';
import GroceryList from '@components/GroceryList';
import Layout from '@components/Layout';
import LoginForm from '@components/LoginForm';
import Spinner from '@components/Spinner';
import { IMenu } from '@interfaces/menu';
import generateMenu from '@lib/generateMenu';
import getUser from '@lib/getUser';
import { NextPage } from 'next';
import { DocumentContext } from 'next/document';
import { Router, useRouter } from 'next/router';
import nookies from 'nookies';
import { useEffect, useState } from 'react';

interface AboutProps {
  user: {
    username: string;
    email: string;
    provider: string;
    confirmed: true;
    blocked: null;
    role: {
      id: number;
      name: string;
      description: string;
      type: string;
    };
    created_at: string;
    updated_at: string;
  };
  menu: IMenu[] | string;
  token: string;
}

const About: NextPage<AboutProps> = ({ user, menu, token }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
      {!loading && user && !Array.isArray(menu) && (
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

      {!loading && user && Array.isArray(menu) && (
        <GroceryList menu={menu} token={token} />
      )}
      {loading && <Spinner />}
    </Layout>
  );
};

export const getServerSideProps = async (ctx: DocumentContext) => {
  const cookies = nookies.get(ctx);
  let user = null;
  let menu: IMenu[] | string = null;
  let token: string = null;

  const UserResponse = await getUser(cookies);

  if (UserResponse) {
    user = UserResponse.user;
    token = UserResponse.token;
    menu = await generateMenu(token, user.username);
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
