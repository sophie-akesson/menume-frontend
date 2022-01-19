export interface SubmittedRecipeDataProps {
  id?: number;
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
