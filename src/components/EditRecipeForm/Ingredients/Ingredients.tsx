import Button from '@components/Button';
import { IngredientsProps } from '@interfaces/ingredientProps';
import { useFieldArray } from 'react-hook-form';
import CategoryOptions from '../CategoryOptions';
import MetricOptions from '../MetricOptions';
import styles from './Ingredients.module.scss';

const Ingredients = ({ control, register, errors }: IngredientsProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'ingredients',
  });

  return (
    <div>
      {fields.map((item, index) => {
        return (
          <div key={item.id} className={styles.ingredientWrapper}>
            <div className={`${styles.ingredientTextinput} fieldGroup`}>
              <input
                {...register(`ingredients.${index}.ingredientId`)}
                type='hidden'
              />
              <label htmlFor={`ingredientName${index}`}>Namn:</label>
              <input
                {...register(`ingredients.${index}.name`, {
                  required: true,
                  minLength: 2,
                })}
                type='text'
                id={`ingredientName${index}`}
              />
              {errors?.ingredients?.[index]?.name && (
                <span className={styles.error}>
                  Namn på ingrediensen måste innehålla minst 2 tecken.
                </span>
              )}
            </div>
            <h3>Kategori:</h3>
            <CategoryOptions register={register} index={index} />
            {errors?.ingredients?.[index]?.category && (
              <span className={styles.error}>Du måste välja en kategori.</span>
            )}
            <div className={`fieldGroup ${styles.amountWrapper}`}>
              <label htmlFor='amount'>Mått:</label>
              <input
                {...register(`ingredients.${index}.amount`, {
                  required: true,
                  pattern: /^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/,
                })}
                type='text'
                id='amount'
              />
              {errors?.ingredients?.[index]?.amount && (
                <span className={styles.error}>
                  En giltig siffra måste vara ifylld som är över 0, decimaltal
                  accepteras också (exempelvis 0.5).
                </span>
              )}
            </div>
            <div className={styles.metricWrapper}>
              <h3>Enhet:</h3>
              <MetricOptions register={register} index={index} />
              {errors?.ingredients?.[index]?.metric && (
                <span className={styles.error}>Du måste välja en enhet.</span>
              )}
              {fields.length > 1 ? (
                <Button type='button' onClick={() => remove(index)}>
                  Ta bort ingrediens
                </Button>
              ) : null}
            </div>
          </div>
        );
      })}
      <div className={styles.ingredientWrapper}>
        <Button
          type='button'
          onClick={() =>
            append({
              name: '',
            })
          }
        >
          Lägg till ytterligare ingrediens
        </Button>
      </div>
    </div>
  );
};

export default Ingredients;
