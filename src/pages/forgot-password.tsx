import ForgotPasswordForm from '@components/ForgotPasswordForm';
import Layout from '@components/Layout';
import { NextPage } from 'next';

const ForgotPassword: NextPage = () => {
  return (
    <Layout isLoggedIn={false}>
      <ForgotPasswordForm />
    </Layout>
  );
};

export default ForgotPassword;
