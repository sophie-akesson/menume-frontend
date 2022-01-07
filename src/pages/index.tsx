import nookies from 'nookies';
import WeeklyMenu from '@components/WeeklyMenu';
import LoginForm from '@components/LoginForm';
import Layout from '@components/Layout';
import getUser from '@lib/getUser';
import getMenu from '@lib/getMenu';
import Box from '@components/Box';
import Button from '@components/Button';
import router from 'next/router';

const Home = ({ user, menu }) => {
  const { username } = user || {};

  return (
    <Layout isLoggedIn={user ? true : false}>
      {!user && <LoginForm />}
      {user && typeof menu === 'string' && (
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
      {user && typeof menu !== 'string' && (
        <WeeklyMenu name={username} menu={menu} />
      )}
    </Layout>
  );
};

export const getServerSideProps = async ctx => {
  let user = null;
  let menu = null;
  let token = null;
  const cookies = nookies.get(ctx);

  const UserResponse = await getUser(cookies);

  if (UserResponse) {
    user = UserResponse.user;
    token = UserResponse.token;
    menu = await getMenu(UserResponse.token, user.username);
  }

  return {
    props: {
      user,
      menu,
    },
  };
};

export default Home;
