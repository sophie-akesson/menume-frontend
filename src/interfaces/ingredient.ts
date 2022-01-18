export interface IIngredient {
  id?: number | number[];
  ingredientId?: number;
  recipe?: number | number[];
  name: string;
  amount: number;
  category: string;
  metric: string;
  checked?: boolean;
}
