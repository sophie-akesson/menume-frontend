export interface AddRecipeFormProps {
  token: {
    token: string;
  };
  showAddRecipeForm(): void;
  setRecipeList(updatedRecipes): void;
}

export interface submittedDataProps {
  name: string;
  servings: string;
  ingredients: [
    {
      amount: number;
      metric: string;
      name: string;
      category: string;
    }
  ];
  description: string;
}
