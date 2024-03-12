import Image from 'next/image';
import styles from './ChipProgress.module.scss';

interface Props {
  column: string;
}

export default function ChipProgress({ column }: Props) {
  return (
    <div className={styles['progress']}>
      <Image width={6} height={6} src="/assets/image/dot.svg" alt="점 이미지" />
      <span>{column}</span>
    </div>
  );
}
