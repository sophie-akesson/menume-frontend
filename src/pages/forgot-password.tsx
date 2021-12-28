import ForgotPasswordForm from '@components/ForgotPasswordForm';
import Layout from '@components/Layout';

const ForgotPassword = () => {
  return (
    <Layout isLoggedIn={false}>
      <ForgotPasswordForm />
    </Layout>
  );
};

export default ForgotPassword;
