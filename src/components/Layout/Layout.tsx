import styles from './Layout.module.scss';
import { Children } from '@interfaces/children';

const Layout = ({ children }: Children) => (
  <main className={styles.main}>{children}</main>
);

export default Layout;
