import nookies from 'nookies';
import AddRecipeForm from '@components/AddRecipeForm';
import Layout from '@components/Layout';
import LoginForm from '@components/LoginForm';
import RecipeList from '@components/RecipeList';
import { useState } from 'react';
import getRecipes from '@lib/getRecipes';
import getUser from '@lib/getUser';

const Recipes = ({ user, token, recipes }) => {
  const [showAddRecipeForm, setShowAddRecipeForm] = useState(false);

  const showAddRecipeFormFunction = () => {
    setShowAddRecipeForm(!showAddRecipeForm);
  };

  return (
    <Layout isLoggedIn={user ? true : false}>
      {!user && <LoginForm />}
      {user && !showAddRecipeForm && (
        <RecipeList
          recipes={recipes}
          showAddRecipeForm={showAddRecipeFormFunction}
        />
      )}
      {user && showAddRecipeForm && (
        <AddRecipeForm
          showAddRecipeForm={showAddRecipeFormFunction}
          token={token}
        />
      )}
    </Layout>
  );
};

export const getServerSideProps = async ctx => {
  let user = null;
  let token = null;
  const cookies = nookies.get(ctx);

  const UserResponse = await getUser(cookies);

  if (UserResponse) {
    user = UserResponse.user;
    token = UserResponse.token;
  }

  const recipes = await getRecipes(user.username, token);

  return {
    props: {
      user,
      token,
      recipes,
    },
  };
};

export default Recipes;
