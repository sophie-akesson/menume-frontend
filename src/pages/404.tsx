import Layout from '@components/Layout';
import Box from '@components/Box';
import Button from '@components/Button';
import type { NextPage } from 'next';
import backToStartPage from '@utils/backToStartPage';

const Custom404: NextPage = () => {
  return (
    <Layout isLoggedIn={false}>
      <>
        <h1>404: Sidan kunde inte hittas</h1>
        <Box>
          <p>
            Vi kunde inte hitta sidan du letade efter. Gå tillbaka till
            startsidan via knappen nedan.
          </p>
          <div>
            <Button type='button' onClick={backToStartPage}>
              Tillbaka till startsidan
            </Button>
          </div>
        </Box>
      </>
    </Layout>
  );
};

export default Custom404;
