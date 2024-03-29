import { ButtonProps } from '@/@types/type';
import styles from './PagenationBtn.module.scss';
import forwardArrowIcon from '../../../../../public/assets/icon/forwardArrowIcon.svg';
import leftArrowIcon from '../../../../../public/assets/icon/leftArrowIcon.svg';
import Image from 'next/image';

const PagenationBtn = ({
  onClick,
  onClickLeft,
  onClickRight,
  nowPage,
  totalPage,
}: ButtonProps) => {
  return (
    <div>
      <button
        className={styles.pagenationBtn}
        onClick={onClickLeft || onClick}
        disabled={!!nowPage && nowPage <= 1}
      >
        <Image src={leftArrowIcon} alt="leftArrowIcon" width={16} height={16} />
      </button>
      <button
        className={styles.pagenationBtn}
        onClick={onClickRight || onClick}
        disabled={!!nowPage && !!totalPage && nowPage >= totalPage}
      >
        <Image
          src={forwardArrowIcon}
          alt="rightArrowIcon"
          width={16}
          height={16}
        />
      </button>
    </div>
  );
};

export default PagenationBtn;

//PagenationBtn 컴포넌트는 onClick만
