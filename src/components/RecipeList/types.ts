import { IRecipe } from '@interfaces/recipe';

export interface RecipeListProps {
  recipes: IRecipe[];
  showAddRecipeForm(): void;
  setShowRecipe(recipe): void;
}
