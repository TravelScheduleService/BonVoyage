import Image from 'next/image';
import styles from './chipTag.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

interface Props {
  tag: string;
  color: string;
  onClick?: () => void;
}

export default function ChipTag({ tag, color, onClick }: Props) {
  return (
    <div className={cn('tag', color)} onClick={onClick}>
      <span>{tag}</span>
      <Image
        className={styles.closeIcon}
        src='/assets/icon/closeIcon.svg'
        alt='close Icon'
        width={12}
        height={12}
      />
    </div>
  );
}
