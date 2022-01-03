import styles from './Button.module.scss';
import { ButtonProps } from './types';

const Button = ({ children, orientation, onClick, type }: ButtonProps) => {
  const getClassName = (orientation): string => {
    if (orientation === 'left') return `${styles.button} ${styles.left}`;
    if (orientation === 'right') return `${styles.button} ${styles.right}`;
    return `${styles.button}`;
  };

  return (
    <button type={type} className={getClassName(orientation)} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
