import Layout from '@components/Layout';
import ResetPasswordForm from '@components/ResetPasswordForm';
import type { NextPage } from 'next';

const ResetPassword: NextPage = () => {
  return (
    <Layout isLoggedIn={false}>
      <ResetPasswordForm />
    </Layout>
  );
};

export default ResetPassword;
