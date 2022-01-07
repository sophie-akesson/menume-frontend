import styles from './WeeklyMenu.module.scss';
import Box from '@components/Box';
import Button from '@components/Button';
import { getISODay } from 'date-fns';
import { WeeklyMenuProps } from './types';

const getWeekday = (date: string) => {
  let day = '';

  switch (getISODay(Date.parse(date))) {
    case 1:
      day = 'Måndag';
      break;
    case 2:
      day = 'Tisdag';
      break;
    case 3:
      day = 'Onsdag';
      break;
    case 4:
      day = 'Torsdag';
      break;
    case 5:
      day = 'Fredag';
      break;
    case 6:
      day = 'Lördag';
      break;
    case 7:
      day = 'Söndag';
  }

  return day;
};

const WeeklyMenu = ({ name, menu }: WeeklyMenuProps) => {
  return (
    <>
      <h1>Välkommen {name}!</h1>
      <div className={styles.menuWrapper}>
        {menu.map(menuItem => (
          <Box key={menuItem.recipe.id} width='var(--size335)'>
            <h2>{getWeekday(menuItem.date)}</h2>
            <h3>{menuItem.recipe.name}</h3>
            <div className='buttonWrapper'>
              <Button type='button' orientation='left'>
                Recept
              </Button>
              <Button type='button' orientation='right'>
                Inköpslista
              </Button>
            </div>
          </Box>
        ))}
      </div>
    </>
  );
};

export default WeeklyMenu;
