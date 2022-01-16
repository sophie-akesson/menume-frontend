import styles from './EditRecipeForm.module.scss';
import Box from '@components/Box';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { EditRecipeFormProps } from './types';
import Button from '@components/Button';
import Ingredients from './Ingredients';
import editRecipe from '@lib/editRecipe';

const EditRecipeForm = ({
  token,
  recipe,
  showRecipeListFunction,
  setRecipeList,
}: EditRecipeFormProps) => {
  const {
    control,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({});
  const [status, setStatus] = useState('');
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (recipe) {
      setValue('id', recipe.id);
      setValue('name', recipe.name);
      setValue('servings', recipe.servings.toString());
      setValue(
        'ingredients',
        recipe.ingredients.map(ingredient => ({
          amount: ingredient.amount,
          metric: ingredient.metric,
          name: ingredient.name,
          category: ingredient.category,
          ingredientId: ingredient.id,
        }))
      );
      setValue('description', recipe.description);
    }
  }, [recipe]);

  const onSubmit = async formData => {
    try {
      const response = await editRecipe(
        formData.id,
        formData.name,
        formData.servings,
        formData.ingredients,
        formData.description,
        token
      );

      if (response.status != 200) throw new Error();

      const data = await response.json();

      setRecipeList(data);
      setIsAdded(true);
    } catch (error) {
      setStatus('Det gick inte att uppdatera ditt recept. Försök igen.');
    }
  };

  return (
    <>
      <h1>Ändra recept</h1>
      <Box>
        {isAdded ? (
          <>
            <h2>Receptet är uppdaterat!</h2>
            <div className='buttonWrapper'>
              <Button type='button' onClick={showRecipeListFunction}>
                Mina recept
              </Button>
            </div>
          </>
        ) : (
          <>
            {status && <span className={styles.error}>{status}</span>}
            <form
              className={styles.editRecipeForm}
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className='row'>
                <div className='fieldGroup'>
                  <input
                    {...register('id', {
                      required: true,
                    })}
                    type='hidden'
                  />
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
                      pattern: /^[1-9]*$/,
                    })}
                    type='text'
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
                  onClick={showRecipeListFunction}
                  orientation='left'
                >
                  Avbryt
                </Button>
                <Button
                  type='submit'
                  onClick={handleSubmit(onSubmit)}
                  orientation='right'
                >
                  Uppdatera recept
                </Button>
              </div>
            </form>
          </>
        )}
      </Box>
    </>
  );
};

export default EditRecipeForm;
