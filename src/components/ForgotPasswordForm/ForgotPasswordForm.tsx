import styles from './ForgotPasswordForm.module.scss';
import Button from '@components/Button';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import backToStartPage from '@utils/backToStartPage';
import { formDataProps } from './types';
import Box from '@components/Box';

const ForgotPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [status, setStatus] = useState('');
  const [isSent, setIsSent] = useState(false);

  const onSubmit = async (formData: formDataProps) => {
    try {
      const response = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }

      setIsSent(true);
    } catch (error) {
      setStatus(
        'Det gick inte att skicka något mejl till din användare. Var god försök igen.'
      );
    }
  };

  return (
    <>
      <h1 className={styles.heading}>Forgot password</h1>
      <Box halfWidth>
        {isSent ? (
          <p className={styles.sent}>
            An email has been sent with a link to reset your password.
          </p>
        ) : (
          <form
            className={styles.forgotPasswordForm}
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className='fieldGroup'>
              <label htmlFor='email'>Please enter your email address:</label>
              <input
                {...register('email', {
                  required: 'required',
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
            {status.length > 0 && (
              <span className={styles.error}>{status}</span>
            )}
            <div className='buttonWrapper'>
              <Button onClick={backToStartPage} orientation='left'>
                Go back
              </Button>
              <Button onClick={handleSubmit(onSubmit)} orientation='right'>
                Send link
              </Button>
            </div>
          </form>
        )}
      </Box>
    </>
  );
};

export default ForgotPasswordForm;
