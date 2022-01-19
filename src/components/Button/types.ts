import { MouseEventHandler, ReactNode } from 'react';

export type Direction = 'left' | 'right';

export type ButtonType = 'button' | 'submit' | 'reset';

export interface ButtonProps {
  children: ReactNode;
  orientation?: Direction;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type: ButtonType;
}
