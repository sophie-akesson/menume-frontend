import type { NextPage } from 'next';
import Head from 'next/head';
import Wrapper from '@components/Wrapper';
import Menu from '@components/Menu';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>MenuMe - Home</title>
        <meta
          name='description'
          content='Fill in your favouriite recipes and get your weekly menu.'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <header>
        <Link href='/'>
          <a>MenuMe</a>
        </Link>
      </header>
      <Wrapper>
        <Menu name={'Sophie'} />
      </Wrapper>
    </>
  );
};

export default Home;
