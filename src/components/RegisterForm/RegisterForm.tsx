import styles from './RegisterForm.module.scss';
import Button from '@components/Button';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Box from '@components/Box';
import { useForm } from 'react-hook-form';
import { formDataProps } from './types';
import backToStartPage from '@utils/backToStartPage';

const RegisterForm = () => {
  const router = useRouter();
  const [status, setStatus] = useState('');
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [isRegistered, setIsRegistered] = useState(false);

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

      setIsRegistered(true);
    } catch (error) {
      setStatus('Det gick inte att registrera din användare. Försök igen.');
    }
  };

  return (
    <>
      <h1 className={styles.heading}>Register</h1>
      <Box halfWidth>
        {isRegistered ? (
          <>
            <p className={styles.registered}>Registration successful!</p>
            <Button onClick={backToStartPage}>Back to start page</Button>
          </>
        ) : (
          <>
            <form
              className={styles.registerForm}
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className='fieldGroup'>
                <label htmlFor='username'>Username:</label>
                <input
                  {...register('username', {
                    required: 'Obligatorisk',
                    minLength: {
                      value: 3,
                      message: 'Användarnamn måste innehålla minst 3 tecken.',
                    },
                  })}
                  type='text'
                  id='username'
                />
                {errors.username && (
                  <span className={styles.error}>
                    {errors.username.message}
                  </span>
                )}
              </div>
              <div className='fieldGroup'>
                <label htmlFor='email'>Email:</label>
                <input
                  {...register('email', {
                    required: 'Obligatorisk',
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: 'Värdet matchar inte formatet för mejladress.',
                    },
                  })}
                  type='email'
                  id='email'
                />
                {errors.email && (
                  <span className={styles.error}>{errors.email.message}</span>
                )}
              </div>
              <div className='fieldGroup'>
                <label htmlFor='password'>Password:</label>
                <input
                  {...register('password', {
                    required: 'Obligatorisk',
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message:
                        'Lösenordet måste innehålla minst 8 tecken, minst en versal, minst en gemen, ett nummer och ett specialtecken.',
                    },
                  })}
                  type='password'
                  id='password'
                />
                {errors.password && (
                  <span className={styles.error}>
                    {errors.password.message}
                  </span>
                )}
              </div>
              <div className='fieldGroup'>
                <label htmlFor='confirmPassword'>Confirm password:</label>
                <input
                  {...register('confirmPassword', {
                    validate: (value: string) => value === watch('password'),
                  })}
                  type='password'
                  id='confirmPassword'
                />
                {errors.confirmPassword && (
                  <span className={styles.error}>
                    Lösenorden måste stämma överens.
                  </span>
                )}
              </div>
              {status.length > 0 && (
                <span className={`${styles.error} ${styles.badRequestSpan}`}>
                  {status}
                </span>
              )}
              <div className='buttonWrapper'>
                <Button onClick={backToStartPage} orientation='left'>
                  Go back
                </Button>
                <Button onClick={handleSubmit(onSubmit)} orientation='right'>
                  Register
                </Button>
              </div>
            </form>
          </>
        )}
      </Box>
    </>
  );
};

export default RegisterForm;
