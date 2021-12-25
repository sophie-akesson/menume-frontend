import styles from './RegisterForm.module.scss';
import Button from '@components/Button';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Box from '@components/Box';
import { useForm } from 'react-hook-form';
import { formDataProps } from './types';

const RegisterForm = () => {
  const router = useRouter();
  const [status, setStatus] = useState('');
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData: formDataProps) => {
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
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

  const backToStartPage = () => {
    router.replace('/');
  };

  return (
    <>
      <h1 className={styles.registerHeading}>Register</h1>
      <Box halfWidth>
        {status.length > 0 && <span className={styles.error}>{status}</span>}
        <form className={styles.registerForm}>
          <label>
            Username:
            <input
              {...register('username', {
                minLength: {
                  value: 3,
                  message: 'Username must be at least 3 characters long',
                },
              })}
              type='text'
            />
          </label>
          {errors.username && (
            <span className={styles.error}>{errors.username.message}</span>
          )}
          <label>
            Email:
            <input
              {...register('email', {
                required: 'required',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Entered value does not match email format',
                },
              })}
              type='email'
            />
          </label>
          {errors.email && (
            <span className={styles.error}>{errors.email.message}</span>
          )}
          <label>
            Password:
            <input
              {...register('password', {
                required: 'required',
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    'Password must have a minimum of eight characters, at least one uppercase letter, one lowercase letter, one number and one special character',
                },
              })}
              type='password'
            />
          </label>
          {errors.password && (
            <span className={styles.error}>{errors.password.message}</span>
          )}
          <label>
            Confirm password:
            <input
              {...register('confirmPassword', {
                validate: (value: string) => value === watch('password'),
              })}
              type='password'
            />
          </label>
          {errors.confirmPassword && (
            <span className={styles.error}>Passwords must match</span>
          )}
          <div className={styles.buttonWrapper}>
            <Button onClick={backToStartPage} orientation='left'>
              Go back
            </Button>
            <Button onClick={handleSubmit(onSubmit)} orientation='right'>
              Register
            </Button>
          </div>
        </form>
      </Box>
    </>
  );
};

export default RegisterForm;
