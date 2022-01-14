import { IMenu } from '@interfaces/menu';

export interface WeeklyMenuProps {
  name: string;
  menu: IMenu[];
  setShowRecipe(recipe): void;
  setShowGroceryList(recipe): void;
}
