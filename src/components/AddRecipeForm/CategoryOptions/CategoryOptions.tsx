import styles from './CategoryOptions.module.scss';

const CategoryOptions = ({ register, index }) => {
  return (
    <div className={styles.categoryWrapper}>
      <div className={styles.categoryRow}>
        <input
          id={`fruitsVetetables${index}`}
          {...register(`ingredients.${index}.category`, { required: true })}
          type='radio'
          value='Frukt & grönsaker'
        />
        <label htmlFor={`fruitsVetetables${index}`}>Frukt & grönsaker</label>
      </div>
      <div className={styles.categoryRow}>
        <input
          id={`meatPoultry${index}`}
          {...register(`ingredients.${index}.category`, { required: true })}
          type='radio'
          value='Kött & fågel'
        />
        <label htmlFor={`meatPoultry${index}`}>Kött & fågel</label>
      </div>
      <div className={styles.categoryRow}>
        <input
          id={`fishSeafood${index}`}
          {...register(`ingredients.${index}.category`, { required: true })}
          type='radio'
          value='Fisk & skaldjur'
        />
        <label htmlFor={`fishSeafood${index}`}>Fisk & skaldjur</label>
      </div>
      <div className={styles.categoryRow}>
        <input
          id={`dairyEggs${index}`}
          {...register(`ingredients.${index}.category`, { required: true })}
          type='radio'
          value='Mejeri & ägg'
        />
        <label htmlFor={`dairyEggs${index}`}>Mejeri & ägg</label>
      </div>
      <div className={styles.categoryRow}>
        <input
          id={`breakBakery${index}`}
          {...register(`ingredients.${index}.category`, { required: true })}
          type='radio'
          value='Bröd & bageri'
        />
        <label htmlFor={`breakBakery${index}`}>Bröd & bageri</label>
      </div>
      <div className={styles.categoryRow}>
        <input
          id={`pantry${index}`}
          {...register(`ingredients.${index}.category`, { required: true })}
          type='radio'
          value='Skafferi'
        />
        <label htmlFor={`pantry${index}`}>Skafferi</label>
      </div>
      <div className={styles.categoryRow}>
        <input
          id={`frozen${index}`}
          {...register(`ingredients.${index}.category`, { required: true })}
          type='radio'
          value='Fryst'
        />
        <label htmlFor={`frozen${index}`}>Fryst</label>
      </div>
      <div className={styles.categoryRow}>
        <input
          id={`vegetarian${index}`}
          {...register(`ingredients.${index}.category`, { required: true })}
          type='radio'
          value='Vegetariskt'
        />
        <label htmlFor={`vegetarian${index}`}>Vegetariskt</label>
      </div>
      <div className={styles.categoryRow}>
        <input
          id={`drinks${index}`}
          {...register(`ingredients.${index}.category`, { required: true })}
          type='radio'
          value='Dryck'
        />
        <label htmlFor={`drinks${index}`}>Dryck</label>
      </div>
      <div className={styles.categoryRow}>
        <input
          id={`worldFoods${index}`}
          {...register(`ingredients.${index}.category`, { required: true })}
          type='radio'
          value='Världens smaker'
        />
        <label htmlFor={`worldFoods${index}`}>Världens smaker</label>
      </div>
      <div className={styles.categoryRow}>
        <input
          id={`spicesSeasoning${index}`}
          {...register(`ingredients.${index}.category`, { required: true })}
          type='radio'
          value='Kryddor & smaksättning'
        />
        <label htmlFor={`spicesSeasoning${index}`}>
          Kryddor & smaksättning
        </label>
      </div>
      <div className={styles.categoryRow}>
        <input
          id={`otherCategory${index}`}
          {...register(`ingredients.${index}.category`, { required: true })}
          type='radio'
          value='Other'
        />
        <label htmlFor={`otherCategory${index}`}>Other</label>
      </div>
    </div>
  );
};

export default CategoryOptions;
