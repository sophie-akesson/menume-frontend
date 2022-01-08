import styles from './MetricOptions.module.scss';

const MetricOptions = ({ register, index }) => {
  const metrics = [
    'st',
    'skivor',
    'krm',
    'tsk',
    'msk',
    'ml',
    'cl',
    'dl',
    'l',
    'g',
    'hg',
    'kg',
  ];

  return (
    <div className={styles.metricWrapper}>
      {metrics.map(metric => (
        <div key={`${metric}${index}`} className={styles.metricRow}>
          <input
            id={`${metric}${index}`}
            {...register(`ingredients.${index}.metric`, { required: true })}
            type='radio'
            value={metric}
          />
          <label htmlFor={`${metric}${index}`}>{metric}</label>
        </div>
      ))}
    </div>
  );
};

export default MetricOptions;
