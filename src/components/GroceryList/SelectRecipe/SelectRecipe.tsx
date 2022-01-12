import Button from '@components/Button';
import styles from './SelectRecipe.module.scss';

const SelectRecipe = () => {
  return (
    <>
      <div className={styles.selectWrapper}>
        <Button type='button'>
          Alla recept
          <span className={styles.arrow}></span>
        </Button>
      </div>
      <ul className={styles.list}>
        <li>
          <input type='radio' name='item' id='item1' title='Item 1' />
          <label htmlFor='default'>Alla recept</label>
        </li>
        <li>
          <input type='radio' name='item' id='item1' title='Item 1' />
          <label htmlFor='item1'>Item 1</label>
        </li>
        <li>
          <input type='radio' name='item' id='item2' title='Item 2' />
          <label htmlFor='item2'>Item 2</label>
        </li>
        <li>
          <input type='radio' name='item' id='item3' title='Item 3' />
          <label htmlFor='item3'>Item 3</label>
        </li>
        <li>
          <input type='radio' name='item' id='item4' title='Item 4' />
          <label htmlFor='item4'>Item 4</label>
        </li>
        <li>
          <input type='radio' name='item' id='item5' title='Item 5' />
          <label htmlFor='item5'>Item 5</label>
        </li>
      </ul>
    </>
  );
};

export default SelectRecipe;
