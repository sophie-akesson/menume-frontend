import Layout from '@components/Layout';
import Box from '@components/Box';
import Button from '@components/Button';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';

const About: NextPage = () => {
  const router = useRouter();

  const backToStartPage = () => {
    router.replace('/register');
  };

  return (
    <Layout isLoggedIn={false}>
      <>
        <h1>About</h1>
        <Box>
          <p>
            <strong>MenuMe</strong> was created to help people plan their meals.
            By entering your favourite recipes MenuMe will be able to help you
            plan your dinner meals by generating a menu for the week. You will
            also have access to a consolidated grocery list to aid you whilst
            grocery shopping, or a grocery list for the day if that&apos;s what
            you prefer.
          </p>
          <div>
            <Button onClick={backToStartPage}>Register today</Button>
          </div>
        </Box>
      </>
    </Layout>
  );
};

export default About;
