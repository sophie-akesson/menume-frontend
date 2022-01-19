export interface SubmittedRecipeDataProps {
  id?: number;
  name: string;
  servings: string;
  ingredients: [
    {
      amount: string;
      metric: string;
      name: string;
      category: string;
    }
  ];
  description: string;
}
