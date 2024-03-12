import styles from './ChipNumber.module.scss';

interface Props {
  number: string;
}

export default function ChipNumber({ number }: Props) {
  return (
    <div className={styles['number']}>
      <span>{number}</span>
    </div>
  );
}
