import styles from './Wrapper.module.scss';

const Wrapper = ({ children }) => (
  <main className={styles.main}>{children}</main>
);

export default Wrapper;
