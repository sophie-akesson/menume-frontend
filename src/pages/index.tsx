import { NextPage } from 'next/types';
import Head from 'next/head';
import WeeklyMenu from '@components/WeeklyMenu';
import Link from 'next/link';
import Login from '@components/Login';
import Layout from '@components/Layout';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>MenuMe - Home</title>
        <meta
          name='description'
          content='Fill in your favourite recipes and get your weekly menu.'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <header>
        <Link href='/'>
          <a>MenuMe</a>
        </Link>
      </header>
      <Layout>
        {/* <WeeklyMenu name={'Sophie'} /> */}
        <Login />
      </Layout>
    </>
  );
};

export default Home;
