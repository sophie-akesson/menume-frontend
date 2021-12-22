import styles from './RegisterForm.module.scss';
import Button from '@components/Button';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Wrapper from '@components/Wrapper';
import Box from '@components/Box';

const RegisterForm = () => {
  const router = useRouter();
  const [input, setInput] = useState({
    username: '',
    email: '',
    password1: '',
    password2: '',
  });
  const [status, setStatus] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setInput(prevInput => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  };

  const handleSubmit = async () => {
    if (input.password1 !== input.password2)
      return setStatus('Passwords must match');

    try {
      await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: input.username,
          email: input.email,
          password: input.password1,
        }),
      });
      router.replace('/');
    } catch (error) {
      setStatus(error.response.data);
    }
  };

  const backToStartPage = () => {
    router.replace('/');
  };

  return (
    <Wrapper>
      <h1 className={styles.registerHeading}>Register</h1>
      <Box halfWidth>
        <form className={styles.registerForm}>
          <label>
            Username:
            <input onChange={handleChange} name='username' type='text' />
          </label>
          <label>
            Email:
            <input onChange={handleChange} name='email' type='text' />
          </label>
          <label>
            Password:
            <input onChange={handleChange} name='password1' type='password' />
          </label>
          <label>
            Confirm password:
            <input onChange={handleChange} name='password2' type='password' />
          </label>
          {status.length > 0 ? <p className={styles.status}>{status}</p> : null}
          <div className={styles.buttonWrapper}>
            <Button execute={backToStartPage} orientation='left'>
              Go back
            </Button>
            <Button execute={handleSubmit} orientation='right'>
              Register
            </Button>
          </div>
        </form>
      </Box>
    </Wrapper>
  );
};

export default RegisterForm;
