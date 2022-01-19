export interface IIngredient {
  id?: number | number[];
  ingredientId?: number;
  recipe?: number | number[];
  name: string;
  amount: string;
  category: string;
  metric: string;
  checked?: boolean;
}
