export interface submittedDataProps {
  name: string;
  servings: number;
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
