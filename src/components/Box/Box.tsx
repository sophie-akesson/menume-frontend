import styles from './Box.module.scss';
import { BoxProps } from './types';

const Box = ({ children, halfWidth }: BoxProps) => (
  <div className={`${styles.wrapper} ${halfWidth ? styles.halfWidth : null}`}>
    {children}
  </div>
);

export default Box;
