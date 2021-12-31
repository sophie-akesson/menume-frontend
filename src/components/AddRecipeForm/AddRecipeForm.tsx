import styles from './AddRecipeForm.module.scss';
import Box from '@components/Box';
import Button from '@components/Button';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Ingredients from './Ingredients';
import { formDataProps } from './types';

const defaultValues = {
  name: '',
  servings: null,
  ingredients: [{ amount: null, metric: '', name: '', category: '' }],
  description: '',
};

const AddRecipeForm = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });
  const [status, setStatus] = useState('');

  const onSubmit = async (formData: formDataProps) => {
    console.log(formData);
    // try {
    //   const response = await fetch('/api/login', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       name: formData.name,
    //       servings: formData.servings,
    //       ingredients: formData.ingredients,
    //       description: formData.description,
    //     }),
    //   });

    //   if (!response.ok) {
    //     const data = await response.json();
    //     throw new Error(data.error);
    //   }

    //   //   router.replace('/');
    // } catch (error) {
    //   setStatus(error.message);
    // }
  };

  return (
    <>
      <h1>Nytt recept</h1>
      <Box>
        <form className={styles.addRecipeForm}>
          <div className='row'>
            <div className='fieldGroup'>
              <label htmlFor='recipeName'>Receptnamn:</label>
              <input
                {...register('name', {
                  required: true,
                  minLength: 3,
                })}
                type='text'
                id='recipeName'
              />
              {errors.name && (
                <span className={styles.error}>
                  Namn på receptet måste innehålla minst 3 tecken.
                </span>
              )}
            </div>
            <div className='fieldGroup'>
              <label htmlFor='servings'>Antal portioner:</label>
              <input
                {...register('servings', {
                  required: true,
                  min: 1,
                })}
                type='number'
                id='servings'
              />
              {errors.servings && (
                <span className={styles.error}>
                  Antal portioner måste vara minst 1.
                </span>
              )}
            </div>
          </div>
          <div className='fieldGroup'>
            <label htmlFor='description'>Beskrivning:</label>
            <textarea
              {...register('description', {
                required: true,
              })}
              rows={10}
              id='description'
              className={styles.description}
            />
            {errors.description && (
              <span className={styles.error}>
                Du måste fylla i en beskrivning.
              </span>
            )}
          </div>
          <h2>Ingredienser</h2>
          <Ingredients control={control} register={register} errors={errors} />
          <div className='buttonWrapper'>
            <Button onClick={() => console.log('hej')} orientation='left'>
              Avbryt
            </Button>
            <Button onClick={handleSubmit(onSubmit)} orientation='right'>
              Spara recept
            </Button>
          </div>
        </form>
      </Box>
    </>
  );
};

export default AddRecipeForm;
