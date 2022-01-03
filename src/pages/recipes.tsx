import AddRecipeForm from '@components/AddRecipeForm';
import Layout from '@components/Layout';
import LoginForm from '@components/LoginForm';
import RecipeList from '@components/RecipeList';
import nookies from 'nookies';
import { useState } from 'react';

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
  const cookies = nookies.get(ctx);
  let user = null;
  let token = null;
  let recipes = null;

  if (cookies?.jwt) {
    try {
      const userResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/me`,
        {
          headers: {
            Authorization: `Bearer ${cookies.jwt}`,
          },
        }
      );

      const userData = await userResponse.json();

      user = userData;
      token = cookies.jwt;

      const RecipeResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/recipes?author.username=${user.username}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      recipes = await RecipeResponse.json();

      if (RecipeResponse.status != 200) throw new Error();
    } catch (error) {
      console.log(error);
    }
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
