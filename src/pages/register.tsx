import type { NextPage } from 'next';
import Layout from '@components/Layout';
import RegisterForm from '@components/RegisterForm';

const Register: NextPage = () => {
  return (
    <Layout isLoggedIn={false}>
      <RegisterForm />
    </Layout>
  );
};

export default Register;
