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
import { IRecipe } from '@interfaces/recipe';
import Recipe from '@components/Recipe';

const Home = ({ user, menu }) => {
  const { username } = user || {};
  const [loading, setLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(true);
  const [showRecipe, setShowRecipe] = useState(false);
  const [recipe, setRecipe] = useState<IRecipe>();

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

  const showMenuFunction = () => {
    setShowMenu(true);
    setShowRecipe(false);
  };

  const showRecipeFunction = () => {
    setShowRecipe(true);
    setShowMenu(false);
  };

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
      {!loading && user && typeof menu !== 'string' && showMenu && (
        <WeeklyMenu
          name={username}
          menu={menu}
          setShowRecipe={recipe => {
            showRecipeFunction();
            setRecipe(recipe);
          }}
        />
      )}
      {!loading && user && typeof menu !== 'string' && showRecipe && (
        <Recipe showList={showMenuFunction} recipe={recipe} />
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
