import styles from './ForgotPasswordForm.module.scss';
import Button from '@components/Button';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import backToStartPage from '@utils/backToStartPage';
import { formDataProps } from './types';
import Box from '@components/Box';
import forgotPassword from '@lib/forgotPassword';

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
      const response = await forgotPassword(formData.email);

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
      <h1 className={styles.heading}>Glömt lösenord</h1>
      <Box halfWidth>
        {isSent ? (
          <p className={styles.sent}>
            Ett mejl har skickats med en länk för återställning av ditt
            lösenord.
          </p>
        ) : (
          <form
            className={styles.forgotPasswordForm}
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className='fieldGroup'>
              <label htmlFor='email'>Fyll i din mejladress:</label>
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
              <Button
                type='button'
                onClick={backToStartPage}
                orientation='left'
              >
                Tillbaka
              </Button>
              <Button
                type='submit'
                onClick={handleSubmit(onSubmit)}
                orientation='right'
              >
                Skicka länk
              </Button>
            </div>
          </form>
        )}
      </Box>
    </>
  );
};

export default ForgotPasswordForm;
