import Button from '@components/Button';
import { useEffect, useRef, useState } from 'react';
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
  const dropDownButton = useRef(null);

  useEffect(() => {
    if (recipe) setButtonName(recipe.name);
  }, [recipe]);

  useEffect(() => {
    const closeOpenMenus = (event: MouseEvent) => {
      if (
        dropDownButton.current &&
        showDropdown &&
        !dropDownButton.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', closeOpenMenus);
    return () => {
      document.removeEventListener('mousedown', closeOpenMenus);
    };
  }, [dropDownButton, showDropdown]);

  const showDropdownFunction = existingClass => {
    if (showDropdown) return `${existingClass} ${styles.show}`;
    else return existingClass;
  };

  const liElements = menu.map(item => (
    <li id={item.recipe.id.toString()} key={item.recipe.id}>
      <button
        type='button'
        onClick={() => {
          setShowDropdown(false);
          setRecipe(item.recipe.id);
        }}
      >
        {item.recipe.name}
      </button>
    </li>
  ));

  return (
    <div ref={dropDownButton} className={styles.selectWrapper}>
      <div className={styles.absoluteWrapper}>
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
                setShowDropdown(false);
                setButtonName('Alla recept');
                resetRecipe();
              }}
            >
              Alla recept
            </button>
          </li>
          {liElements}
        </ul>
      </div>
    </div>
  );
};

export default SelectRecipe;
