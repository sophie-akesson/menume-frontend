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
import EditRecipeForm from '@components/EditRecipeForm';

const Recipes = ({ user, token, recipes }) => {
  const [showAddRecipeForm, setShowAddRecipeForm] = useState(false);
  const [showRecipe, setShowRecipe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recipeList, setRecipeList] = useState<IRecipe[]>([]);
  const [showRecipeList, setShowRecipeList] = useState(true);
  const [showEditRecipeForm, setShowEditRecipeForm] = useState(false);
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
    setShowRecipe(false);
    setShowRecipeList(false);
    setShowEditRecipeForm(false);
    setShowAddRecipeForm(true);
  };

  const showRecipeFunction = () => {
    setShowRecipeList(false);
    setShowAddRecipeForm(false);
    setShowEditRecipeForm(false);
    setShowRecipe(true);
  };

  const showRecipeListFunction = () => {
    setShowRecipe(false);
    setShowAddRecipeForm(false);
    setShowEditRecipeForm(false);
    setShowRecipeList(true);
  };

  const showEditRecipeFormFunction = () => {
    setShowAddRecipeForm(false);
    setShowRecipe(false);
    setShowRecipeList(false);
    setShowEditRecipeForm(true);
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
          setShowEditForm={recipe => {
            showEditRecipeFormFunction();
            setRecipe(recipe);
          }}
        />
      )}
      {!loading && user && showRecipe && (
        <Recipe showList={showRecipeListFunction} recipe={recipe} />
      )}
      {!loading && user && showAddRecipeForm && (
        <AddRecipeForm
          showRecipeListFunction={showRecipeListFunction}
          token={token}
          setRecipeList={recipe => setRecipeList([...recipeList, recipe])}
        />
      )}
      {!loading && user && showEditRecipeForm && (
        <EditRecipeForm
          showRecipeListFunction={showRecipeListFunction}
          token={token}
          recipe={recipe}
          setRecipeList={recipe => {
            const newRecipeList = [...recipeList];
            for (let i = 0; i < newRecipeList.length; i++) {
              if (newRecipeList[i].id === recipe.id) {
                newRecipeList[i] = recipe;
                setRecipeList(newRecipeList);
              }
            }
          }}
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
