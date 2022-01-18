import { FieldValues, UseFormRegister } from 'react-hook-form';

export interface CategoryOptionsProps {
  register: UseFormRegister<
    | {
        name: string;
        servings: string;
        ingredients: {
          amount: string;
          metric: string;
          name: string;
          category: string;
        }[];
        description: string;
      }
    | FieldValues
  >;
  index: number;
}
