import { Recipe } from '@interfaces/recipe';

export interface RecipeListProps {
  recipes: Recipe[];
  showAddRecipeForm(): void;
}
