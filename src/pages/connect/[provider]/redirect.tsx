import Layout from '@components/Layout';
import Box from '@components/Box';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Button from '@components/Button';
import backToStartPage from '@utils/backToStartPage';

const Redirect: NextPage = () => {
  const [status, setStatus] = useState('');
  const router = useRouter();

  useEffect(() => {
    const login = async () => {
      const { provider, access_token } = router.query;
      try {
        const response = await fetch(`/api/connect/${provider}/redirect`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            access_token: access_token,
          }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error);
        }

        router.replace('/');
      } catch (error) {
        setStatus(error.message);
      }
    };
    if (router.isReady) login();
  }, [router]);

  return (
    <Layout isLoggedIn={false}>
      {status ? (
        <>
          <Box halfWidth>
            <p>We&apos;re sorry, we couldn&apos;t log you in.</p>
            <span>{status}</span>
            <Button onClick={backToStartPage}>Back to start page</Button>
          </Box>
        </>
      ) : (
        <>
          <Box halfWidth>
            <p>We&apos;re logging you in, please wait.</p>
          </Box>
        </>
      )}
    </Layout>
  );
};

export default Redirect;
