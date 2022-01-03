import React from 'react';

export type Direction = 'left' | 'right';

export type ButtonType = 'button' | 'submit' | 'reset';

export interface ButtonProps {
  children: React.ReactNode;
  orientation?: Direction;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type: ButtonType;
}
