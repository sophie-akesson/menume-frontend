import getClassName from './getClassName';
import { ButtonProps } from './types';

const Button = ({ children, orientation, onClick, type }: ButtonProps) => {
  return (
    <button type={type} className={getClassName(orientation)} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
