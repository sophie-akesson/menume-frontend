import styles from './Button.module.scss';

const getClassName = (orientation: string): string => {
  if (orientation === 'left') return `${styles.button} ${styles.left}`;
  if (orientation === 'right') return `${styles.button} ${styles.right}`;
  return `${styles.button}`;
};

export default getClassName;
