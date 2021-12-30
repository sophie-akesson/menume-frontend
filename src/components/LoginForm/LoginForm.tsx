import styles from './LoginForm.module.scss';
import { useRouter } from 'next/router';
import Box from '@components/Box';
import Button from '@components/Button';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { formDataProps } from './types';

const LoginForm = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const [status, setStatus] = useState('');

  const onSubmit = async (formData: formDataProps) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identifier: formData.identifier,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }

      router.replace('/');
    } catch (error) {
      setStatus(error.message);
    }
  };

  const loginViaProvider = (provider: string) => {
    router.replace(`${process.env.NEXT_PUBLIC_API_URL}/connect/${provider}`);
  };

  return (
    <>
      <h1 className={styles.heading}>Login</h1>
      <Box halfWidth>
        <div className={styles.register}>
          <p>{`Don't have an account yet?`}</p>
          <Link href='/register'>
            <a>Register here.</a>
          </Link>
        </div>
        {status ? <p className={styles.error}>{status}</p> : null}
        <form className={styles.loginForm}>
          <label>
            Email:
            <input
              {...register('identifier', {
                required: 'required',
              })}
              type='text'
            />
          </label>
          <label>
            Password:
            <input
              {...register('password', {
                required: 'required',
              })}
              type='password'
            />
          </label>
          <div className={styles.forgotPassword}>
            <Link href='/forgot-password'>
              <a>Forgot password?</a>
            </Link>
          </div>
          <Button onClick={handleSubmit(onSubmit)}>Login</Button>
        </form>
        <span className={styles.span}>Or login with:</span>
        <div className={styles.loginOptionsWrapper}>
          <Button onClick={() => loginViaProvider('google')} orientation='left'>
            Google
          </Button>
          <Button
            onClick={() => loginViaProvider('twitch')}
            orientation='right'
          >
            Twitch
          </Button>
        </div>
      </Box>
    </>
  );
};

export default LoginForm;
