import { IRecipe } from '@interfaces/recipe';

export interface EditRecipeFormProps {
  token: { token: string };
  recipe: IRecipe;
  showRecipeListFunction(): void;
  setRecipeList(updatedRecipes): void;
}
