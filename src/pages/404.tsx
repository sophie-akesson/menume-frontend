import Layout from '@components/Layout';
import Box from '@components/Box';
import Button from '@components/Button';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import backToStartPage from '@utils/backToStartPage';

const Custom404: NextPage = () => {
  const router = useRouter();

  return (
    <Layout isLoggedIn={false}>
      <>
        <h1>404: Page not found</h1>
        <Box>
          <p>
            We could not find the page you were looking for. Go to the start
            page using the button below.
          </p>
          <div>
            <Button onClick={backToStartPage}>Back to start page</Button>
          </div>
        </Box>
      </>
    </Layout>
  );
};

export default Custom404;
