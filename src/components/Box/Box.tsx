import styles from './Box.module.scss';
import { BoxProps } from './types';

const Box = ({ children, halfWidth, width }: BoxProps) => (
  <div
    className={`${styles.wrapper} ${halfWidth ? styles.halfWidth : null}`}
    style={{ width: `${width}` }}
  >
    {children}
  </div>
);

export default Box;
