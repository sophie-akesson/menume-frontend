import styles from './Login.module.scss';
import { useRouter } from 'next/router';
import Box from '@components/Box';
import Button from '@components/Button';
import Wrapper from '@components/Wrapper';
import Link from 'next/link';

const Login = () => {
  const router = useRouter();

  const placeholderFunction = () => {
    console.log('Test');
  };

  const goToRegisterPage = () => {
    router.replace('/register');
  };

  return (
    <Wrapper>
      <h1 className={styles.loginHeader}>Login</h1>
      <Box halfWidth>
        <div className={styles.register}>
          <p>{`Don't have an account yet?`}</p>
          <Link href='/register'>
            <a>Register here.</a>
          </Link>
        </div>
        <form className={styles.loginForm}>
          <label>
            Email:
            <input type='text' name='email' />
          </label>
          <label>
            Password:
            <input type='password' name='password' />
          </label>
          <Button execute={placeholderFunction}>Login</Button>
        </form>
        <span className={styles.span}>Or login with</span>
        <div className={styles.loginOptionsWrapper}>
          <Button execute={placeholderFunction} orientation='left'>
            Google
          </Button>
          <Button execute={placeholderFunction} orientation='right'>
            Facebook
          </Button>
        </div>
      </Box>
    </Wrapper>
  );
};

export default Login;
