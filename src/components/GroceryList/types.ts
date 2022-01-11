import { IMenu } from '@interfaces/menu';

export interface GroceryListProps {
  menu?: IMenu[];
  recipe?: string;
  token: string;
}
