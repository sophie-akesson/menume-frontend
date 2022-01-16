import { IRecipe } from './recipe';

export interface IMenu {
  id?: string;
  date: string;
  recipe: IRecipe;
}
