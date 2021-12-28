import styles from './ResetPasswordForm.module.scss';
import Button from '@components/Button';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Box from '@components/Box';
import { useForm } from 'react-hook-form';
import { formDataProps } from './types';

const ResetPasswordForm = () => {
  const router = useRouter();
  const [status, setStatus] = useState('');
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData: formDataProps) => {
    console.log(router.query.code);
    try {
      const response = await fetch('/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: router.query.code,
          password: formData.password,
          passwordConfirmation: formData.confirmPassword,
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

  return (
    <>
      <h1 className={styles.heading}>Reset password</h1>
      <Box halfWidth>
        {status.length > 0 && <span className={styles.error}>{status}</span>}
        <form className={styles.resetPasswordForm}>
          <label>
            Enter new password:
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
            Confirm new password:
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
          <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
        </form>
      </Box>
    </>
  );
};

export default ResetPasswordForm;
