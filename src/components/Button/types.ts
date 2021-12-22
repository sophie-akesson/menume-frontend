import React from 'react';

export type Direction = 'left' | 'right';

export interface ButtonProps {
  children: React.ReactNode;
  orientation?: Direction;
  execute(): void;
}
