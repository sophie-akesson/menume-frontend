import styles from './Spinner.module.scss';

const Spinner = () => (
  <div className={styles.spinnerWrapper}>
    <div className={styles.spinnerCircle}></div>
  </div>
);

export default Spinner;
