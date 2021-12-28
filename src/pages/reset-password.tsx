import Layout from '@components/Layout';
import ResetPasswordForm from '@components/ResetPasswordForm';

const ResetPassword = () => {
  return (
    <Layout isLoggedIn={false}>
      <ResetPasswordForm />
    </Layout>
  );
};

export default ResetPassword;
