import styles from './ChipTag.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

interface Props {
  tag: string;
  color: 'orange' | 'pink' | 'blue' | 'green';
}

export default function ChipTag({ tag, color }: Props) {
  return (
    <div className={cn('tag', color)}>
      <span>{tag}</span>
    </div>
  );
}
