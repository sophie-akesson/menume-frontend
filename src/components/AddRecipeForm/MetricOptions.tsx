import styles from './MetricOptions.module.scss';

const MetricOptions = ({ register, index }) => {
  return (
    <div className={styles.metricWrapper}>
      <div className={styles.metricRow}>
        <input
          id={`st${index}`}
          {...register(`ingredients.${index}.metric`, { required: true })}
          type='radio'
          value='st'
        />
        <label htmlFor={`st${index}`}>st</label>
      </div>
      <div className={styles.metricRow}>
        <input
          id={`skivor${index}`}
          {...register(`ingredients.${index}.metric`, { required: true })}
          type='radio'
          value='skivor'
        />
        <label htmlFor={`skivor${index}`}>skivor</label>
      </div>
      <div className={styles.metricRow}>
        <input
          id={`krm${index}`}
          {...register(`ingredients.${index}.metric`, { required: true })}
          type='radio'
          value='krm'
        />
        <label htmlFor={`krm${index}`}>krm</label>
      </div>
      <div className={styles.metricRow}>
        <input
          id={`tsk${index}`}
          {...register(`ingredients.${index}.metric`, { required: true })}
          type='radio'
          value='tsk'
        />
        <label htmlFor={`tsk${index}`}>tsk</label>
      </div>
      <div className={styles.metricRow}>
        <input
          id={`msk${index}`}
          {...register(`ingredients.${index}.metric`, { required: true })}
          type='radio'
          value='msk'
        />
        <label htmlFor={`msk${index}`}>msk</label>
      </div>
      <div className={styles.metricRow}>
        <input
          id={`ml${index}`}
          {...register(`ingredients.${index}.metric`, { required: true })}
          type='radio'
          value='ml'
        />
        <label htmlFor={`ml${index}`}>ml</label>
      </div>
      <div className={styles.metricRow}>
        <input
          id={`cl${index}`}
          {...register(`ingredients.${index}.metric`, { required: true })}
          type='radio'
          value='cl'
        />
        <label htmlFor={`cl${index}`}>cl</label>
      </div>
      <div className={styles.metricRow}>
        <input
          id={`dl${index}`}
          {...register(`ingredients.${index}.metric`, { required: true })}
          type='radio'
          value='dl'
        />
        <label htmlFor={`dl${index}`}>dl</label>
      </div>
      <div className={styles.metricRow}>
        <input
          id={`litres${index}`}
          {...register(`ingredients.${index}.metric`, { required: true })}
          type='radio'
          value='l'
        />
        <label htmlFor={`litres${index}`}>l</label>
      </div>
      <div className={styles.metricRow}>
        <input
          id={`grams${index}`}
          {...register(`ingredients.${index}.metric`, { required: true })}
          type='radio'
          value='g'
        />
        <label htmlFor={`grams${index}`}>g</label>
      </div>
      <div className={styles.metricRow}>
        <input
          id={`hg${index}`}
          {...register(`ingredients.${index}.metric`, { required: true })}
          type='radio'
          value='hg'
        />
        <label htmlFor={`hg${index}`}>hg</label>
      </div>
      <div className={styles.metricRow}>
        <input
          id={`kg${index}`}
          {...register(`ingredients.${index}.metric`, { required: true })}
          type='radio'
          value='kg'
        />
        <label htmlFor={`kg${index}`}>kg</label>
      </div>
    </div>
  );
};

export default MetricOptions;
