export interface AddRecipeFormProps {
  token: string;
  showRecipeListFunction(): void;
  setRecipeList(updatedRecipes): void;
}
