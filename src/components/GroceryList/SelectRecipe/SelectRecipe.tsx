import Button from '@components/Button';
import { useEffect, useState } from 'react';
import styles from './SelectRecipe.module.scss';
import { SelectRecipeProps } from './types';

const SelectRecipe = ({
  menu,
  recipe,
  setRecipe,
  resetRecipe,
}: SelectRecipeProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [buttonName, setButtonName] = useState('Alla recept');

  useEffect(() => {
    if (recipe) setButtonName(recipe.name);
  }, [recipe]);

  const showDropdownFunction = existingClass => {
    if (showDropdown) return `${existingClass} ${styles.show}`;
    else return existingClass;
  };

  const liElements = menu.map(item => (
    <li key={item.id}>
      <button
        type='button'
        onClick={() => {
          setRecipe(item.id);
        }}
      >
        {item.recipe.name}
      </button>
    </li>
  ));

  return (
    <div className={styles.selectWrapper}>
      <div className={showDropdownFunction(null)}>
        <Button type='button' onClick={() => setShowDropdown(!showDropdown)}>
          {buttonName}
          <span></span>
        </Button>
      </div>
      <ul className={showDropdownFunction(styles.list)}>
        <li>
          <button
            type='button'
            onClick={() => {
              setButtonName('Alla recept');
              setRecipe('');
              resetRecipe();
            }}
          >
            Alla recept
          </button>
        </li>
        {liElements}
      </ul>
    </div>
  );
};

export default SelectRecipe;
