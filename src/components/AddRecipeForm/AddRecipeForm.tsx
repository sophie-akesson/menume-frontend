import styles from './AddRecipeForm.module.scss';
import Box from '@components/Box';
import Button from '@components/Button';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Ingredients from './Ingredients';
import { AddRecipeFormProps, submittedDataProps } from './types';

const defaultValues = {
  name: '',
  servings: null,
  ingredients: [{ amount: null, metric: '', name: '', category: '' }],
  description: '',
};

const AddRecipeForm = ({ token, showAddRecipeForm }: AddRecipeFormProps) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });
  const [status, setStatus] = useState('');
  const [isAdded, setIsAdded] = useState(false);

  const onSubmit = async (formData: submittedDataProps) => {
    try {
      const response = await fetch('/api/addRecipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          servings: formData.servings,
          ingredients: formData.ingredients,
          description: formData.description,
          token: token,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }

      setIsAdded(true);
    } catch (error) {
      setStatus('Det gick inte att registrera din användare. Försök igen.');
    }
  };

  return (
    <>
      <h1>Nytt recept</h1>
      <Box>
        {isAdded ? (
          <p>Receptet är tillagt!</p>
        ) : (
          <form
            className={styles.addRecipeForm}
            onSubmit={handleSubmit(onSubmit)}
          >
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
            <Ingredients
              control={control}
              register={register}
              errors={errors}
            />
            {status && <span className={styles.error}>{status}</span>}
            <div className='buttonWrapper'>
              <Button
                type='button'
                onClick={showAddRecipeForm}
                orientation='left'
              >
                Avbryt
              </Button>
              <Button
                type='submit'
                onClick={handleSubmit(onSubmit)}
                orientation='right'
              >
                Spara recept
              </Button>
            </div>
          </form>
        )}
      </Box>
    </>
  );
};

export default AddRecipeForm;
