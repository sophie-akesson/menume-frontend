import styles from './Box.module.scss';
import { BoxProps } from './types';

const Box = ({ children, halfWidth, card }: BoxProps) => (
  <div
    className={`${styles.wrapper} ${halfWidth ? styles.halfWidth : null} ${
      card ? styles.card : null
    }`}
  >
    {children}
  </div>
);

export default Box;
