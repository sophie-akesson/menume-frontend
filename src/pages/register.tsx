import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '@components/Layout';
import RegisterForm from '@components/RegisterForm';

const Register: NextPage = () => {
  return (
    <>
      <Head>
        <title>MenuMe - Register</title>
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
        <RegisterForm />
      </Layout>
    </>
  );
};

export default Register;
