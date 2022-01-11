export interface IRecipe {
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
      checked?: boolean;
    }
  ];
  published_at?: string;
  created_at?: string;
  author?: {
    created_at?: string;
    blocked?: null;
    provider?: string;
    role?: number;
    username?: string;
    updated_at?: string;
    id?: number;
    email?: string;
    confirmed?: boolean;
  };
  updated_at?: string;
  menu?: null;
}
