import { IMenu } from '@interfaces/menu';
import { IRecipe } from '@interfaces/recipe';

export interface SelectRecipeProps {
  menu: IMenu[];
  recipe?: IRecipe;
  setRecipe(id): void;
  resetRecipe(): void;
}
