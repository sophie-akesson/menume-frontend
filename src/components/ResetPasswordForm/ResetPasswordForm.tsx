import styles from './ResetPasswordForm.module.scss';
import Button from '@components/Button';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Box from '@components/Box';
import { useForm } from 'react-hook-form';
import { formDataProps } from './types';
import resetPassword from '@lib/resetPassword';

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
    try {
      const response = await resetPassword(
        router.query.code,
        formData.password,
        formData.confirmPassword
      );

      if (response.status != 200) throw new Error();

      router.replace('/');
    } catch (error) {
      setStatus(
        'Det gick inte att sätta ett nytt lösenord. Kontrollera att det inte har gått för lång tid sedan du fick mejlet med återställningslänken.'
      );
    }
  };

  return (
    <>
      <h1 className={styles.heading}>Återställ lösenord</h1>
      <Box halfWidth>
        <form
          className={styles.resetPasswordForm}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='fieldGroup'>
            <label htmlFor='password'>Nytt lösenord:</label>
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
          </div>
          <div className='fieldGroup'>
            <label htmlFor='confirmPassword'>Bekräfta nytt lösenord:</label>
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
            {status.length > 0 && (
              <span className={styles.error}>{status}</span>
            )}
          </div>
          <Button type='submit' onClick={handleSubmit(onSubmit)}>
            Spara
          </Button>
        </form>
      </Box>
    </>
  );
};

export default ResetPasswordForm;
