import styles from './Button.module.scss';
import { ButtonProps } from './types';

const Button = ({ children, orientation, execute }: ButtonProps) => {
  const getClassName = (dual): string => {
    if (orientation === 'left') return `${styles.button} ${styles.left}`;
    if (orientation === 'right') return `${styles.button} ${styles.right}`;
    return `${styles.button}`;
  };

  return (
    <button
      type='button'
      className={getClassName(orientation)}
      onClick={(event: React.MouseEvent<HTMLButtonElement>) => execute()}
    >
      {children}
    </button>
  );
};

export default Button;