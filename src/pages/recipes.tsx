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
import Recipe from '@components/Recipe';
import { IRecipe } from '@interfaces/recipe';

const Recipes = ({ user, token, recipes }) => {
  const [showAddRecipeForm, setShowAddRecipeForm] = useState(false);
  const [showRecipe, setShowRecipe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recipeList, setRecipeList] = useState<IRecipe[]>([]);
  const [showRecipeList, setShowRecipeList] = useState(true);
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

  useEffect(() => {
    setRecipeList(recipes);
  }, [recipes]);

  const showAddRecipeFormFunction = () => {
    setShowAddRecipeForm(true);
    setShowRecipe(false);
    setShowRecipeList(false);
  };

  const showRecipeFunction = () => {
    setShowRecipe(true);
    setShowRecipeList(false);
    setShowAddRecipeForm(false);
  };

  const showRecipeListFunction = () => {
    setShowRecipe(false);
    setShowRecipeList(true);
    setShowAddRecipeForm(false);
  };

  return (
    <Layout isLoggedIn={user ? true : false}>
      {!loading && !user && <LoginForm />}
      {!loading && user && showRecipeList && (
        <RecipeList
          recipes={recipeList}
          showAddRecipeForm={showAddRecipeFormFunction}
          setShowRecipe={recipe => {
            showRecipeFunction();
            setRecipe(recipe);
          }}
          setRecipeList={recipe => {
            const recipes = recipeList.filter(item => item.id !== recipe.id);
            setRecipeList(recipes);
          }}
          token={token}
          username={user.username}
        />
      )}
      {!loading && user && showRecipe && (
        <Recipe showList={showRecipeListFunction} recipe={recipe} />
      )}
      {!loading && user && showAddRecipeForm && !showRecipe && (
        <AddRecipeForm
          showRecipeListFunction={showRecipeListFunction}
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
