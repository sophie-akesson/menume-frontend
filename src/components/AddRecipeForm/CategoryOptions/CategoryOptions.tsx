import styles from './CategoryOptions.module.scss';
import { CategoryOptionsProps } from '@interfaces/categoryOptionsProps';

const CategoryOptions = ({ register, index }: CategoryOptionsProps) => {
  const categories = [
    'Frukt & grönsaker',
    'Kött & fågel',
    'Fisk & skaldjur',
    'Mejeri & ägg',
    'Bröd & bageri',
    'Skafferi',
    'Fryst',
    'Vegetariskt',
    'Dryck',
    'Världens smaker',
    'Kryddor & smaksättning',
    'Övrigt',
  ];

  return (
    <div className={styles.categoryWrapper}>
      {categories.map(category => (
        <div key={`${category}${index}`} className={styles.categoryRow}>
          <input
            id={`${category}${index}`}
            {...register(`ingredients.${index}.category`, { required: true })}
            type='radio'
            value={category}
          />
          <label htmlFor={`${category}${index}`}>{category}</label>
        </div>
      ))}
    </div>
  );
};

export default CategoryOptions;
