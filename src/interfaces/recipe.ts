export interface Recipe {
  id: number;
  name: string;
  servings: number;
  description: string;
  ingredients: [
    {
      name: string;
      amount: string;
      category: string;
      metric: string;
    }
  ];
}
