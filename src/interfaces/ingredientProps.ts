import {
  Control,
  FieldError,
  FieldValues,
  UseFormRegister,
} from 'react-hook-form';

export interface IngredientsProps {
  control: Control<FieldValues, object>;
  register: UseFormRegister<FieldValues>;
  errors: {
    [x: string]: any;
  };
}
