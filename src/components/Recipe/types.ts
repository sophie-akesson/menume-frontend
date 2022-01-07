import { IRecipe } from '@interfaces/recipe';

export interface RecipeProps {
  recipe: IRecipe;
  showList(): void;
}
