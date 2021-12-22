import styles from './Wrapper.module.scss';
import { Children } from '@interfaces/children';

const Wrapper = ({ children }: Children) => (
  <div className={styles.wrapper}>{children}</div>
);

export default Wrapper;
