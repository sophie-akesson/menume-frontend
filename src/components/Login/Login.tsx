import styles from './Login.module.scss';
import Box from '@components/Box';
import Button from '@components/Button';
import Wrapper from '@components/Wrapper';

const Login = () => {
  const placeholderFunction = () => {
    console.log('Test');
  };

  return (
    <Wrapper>
      <h1>Sign in</h1>
      <Box halfWidth>
        <form className={styles.loginForm}>
          <label>
            Email:
            <input type='text' name='email' />
          </label>
          <label>
            Password:
            <input type='password' name='password' />
          </label>
          <Button execute={placeholderFunction}>Log in</Button>
        </form>
        <div className={styles.loginOptionsWrapper}>
          <Button execute={placeholderFunction} orientation='left'>
            Google
          </Button>
          <Button execute={placeholderFunction} orientation='right'>
            Facebook
          </Button>
        </div>
        <Button execute={placeholderFunction}>Register new account</Button>
      </Box>
    </Wrapper>
  );
};

export default Login;
