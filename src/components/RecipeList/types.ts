import { IRecipe } from '@interfaces/recipe';

export interface RecipeListProps {
  recipes: IRecipe[];
  showAddRecipeForm(): void;
  setShowRecipe(recipe): void;
  setRecipeList(removedRecipe): void;
  token: string;
  username: string;
  setShowEditForm(recipe): void;
}
