import nookies from 'nookies';
import AddRecipeForm from '@components/AddRecipeForm';
import Layout from '@components/Layout';
import LoginForm from '@components/LoginForm';
import RecipeList from '@components/RecipeList';
import { useEffect, useState } from 'react';
import getRecipes from '@lib/getRecipes';
import getUser from '@lib/getUser';
import { Router } from 'next/router';
import Spinner from '@components/Spinner';

const Recipes = ({ user, token, recipes }) => {
  const [showAddRecipeForm, setShowAddRecipeForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recipeList, setRecipeList] = useState([]);

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

  useEffect(() => {
    setRecipeList(recipes);
  }, [recipes]);

  const showAddRecipeFormFunction = () => {
    setShowAddRecipeForm(!showAddRecipeForm);
  };

  return (
    <Layout isLoggedIn={user ? true : false}>
      {!loading && !user && <LoginForm />}
      {!loading && user && !showAddRecipeForm && (
        <RecipeList
          recipes={recipeList}
          showAddRecipeForm={showAddRecipeFormFunction}
        />
      )}
      {!loading && user && showAddRecipeForm && (
        <AddRecipeForm
          showAddRecipeForm={showAddRecipeFormFunction}
          token={token}
          setRecipeList={recipe => setRecipeList([...recipeList, recipe])}
        />
      )}
      {loading && <Spinner />}
    </Layout>
  );
};

export const getServerSideProps = async ctx => {
  let user = null;
  let token = null;
  let recipes = null;
  const cookies = nookies.get(ctx);

  const UserResponse = await getUser(cookies);

  if (UserResponse) {
    user = UserResponse.user;
    token = UserResponse.token;
    recipes = await getRecipes(user.username, token);
  }

  return {
    props: {
      user,
      token,
      recipes,
    },
  };
};

export default Recipes;
