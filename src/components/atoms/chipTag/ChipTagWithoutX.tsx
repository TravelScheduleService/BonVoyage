import styles from './chipTag.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

interface Props {
  tag?: string;
  color: string;
  onClick?: () => void;
}

export default function ChipTagWithoutX({ tag, color, onClick }: Props) {
  return (
    <div className={cn('tag', color)} onClick={onClick}>
      <span>{tag}</span>
    </div>
  );
}
