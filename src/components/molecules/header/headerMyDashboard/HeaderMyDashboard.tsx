import Link from 'next/link';
import styles from './headerMyDashboard.module.scss';
import HeaderBtn from '@/components/atoms/buttons/headerBtn';
import { useMediaQuery } from 'react-responsive';
import Image from 'next/image';

export default function HeaderMyDashboard({
  enName = 'Name',
  koName = '이름',
  boardTitle = '내 대시보드',
}) {
  const firstCharacter = enName.slice(0, 1);
  const isTablet = useMediaQuery({ minWidth: 769 });
  const isPC = useMediaQuery({ minWidth: 1024 });

  return (
    <>
      <div className={styles['header']}>
        {isPC && (
          <div className={styles['boardTitle']}>
            <span>{boardTitle}</span>
            <Image
              src="/assets/icon/crownIcon.svg"
              width={20}
              height={16}
              alt="crown"
            />
          </div>
        )}
        <div className={styles['headerRight']}>
          <div className={styles['headerBtn']}>
            <HeaderBtn name="관리" type="edit" />
            <HeaderBtn name="초대하기" type="invite" />
          </div>
          <div className={styles['line']}></div>
          <div className={styles['invited']}></div>
          <div className={styles['userProfile']}>
            <div className={styles['myIcon']}>{firstCharacter}</div>
            {isTablet && <span>{koName}</span>}
          </div>
        </div>
      </div>
    </>
  );
}
