import {
  Control,
  FieldError,
  FieldValues,
  UseFormRegister,
} from 'react-hook-form';

export interface IngredientsProps {
  control:
    | Control<FieldValues, object>
    | Control<
        {
          name: string;
          servings: string;
          ingredients: {
            amount: string;
            metric: string;
            name: string;
            category: string;
          }[];
          description: string;
        },
        object
      >;
  register:
    | UseFormRegister<FieldValues>
    | UseFormRegister<{
        name: string;
        servings: string;
        ingredients: {
          amount: string;
          metric: string;
          name: string;
          category: string;
        }[];
        description: string;
      }>;
  errors: {
    name?: FieldError;
    servings?: FieldError;
    ingredients?: {
      amount?: FieldError;
      metric?: FieldError;
      name?: FieldError;
      category?: FieldError;
    }[];
    description?: FieldError;
  };
}
