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
      setStatus('Felaktig mejladress eller lösenord.');
    }
  };

  const loginViaProvider = (provider: string) => {
    router.replace(`${process.env.NEXT_PUBLIC_API_URL}/connect/${provider}`);
  };

  return (
    <>
      <h1 className={styles.heading}>Logga in</h1>
      <Box halfWidth>
        <div className={styles.register}>
          <p>{`Inget konto?`}</p>
          <Link href='/register'>
            <a>Registrera dig här.</a>
          </Link>
        </div>
        <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
          <div className='fieldGroup'>
            <label htmlFor='email'>Mailadress:</label>
            <input
              {...register('identifier', {
                required: 'Obligatorisk',
              })}
              type='text'
              id='email'
            />
          </div>
          <div className='fieldGroup'>
            <label htmlFor='password'>Lösenord:</label>
            <input
              {...register('password', {
                required: 'Obligatorisk',
              })}
              type='password'
              id='password'
            />
          </div>
          <div className={styles.forgotPassword}>
            <Link href='/forgot-password'>
              <a>Glömt lösenordet?</a>
            </Link>
          </div>
          {status ? <span className={styles.error}>{status}</span> : null}
          <Button type='submit' onClick={handleSubmit(onSubmit)}>
            Logga in
          </Button>
        </form>
        <span className={styles.span}>Eller logga in med:</span>
        <div className='buttonWrapper'>
          <Button
            type='button'
            onClick={() => loginViaProvider('google')}
            orientation='left'
          >
            Google
          </Button>
          <Button
            type='button'
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
