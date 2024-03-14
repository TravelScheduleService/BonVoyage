import HeaderBtn from '@/components/atoms/headerBtn/HeaderBtn';
import styles from './myHeader.module.scss';
import Image from 'next/image';

interface Props {
  profileImageUrl: string;
  nickname: string;
}

export default function MyHeader({ profileImageUrl, nickname }: Props) {
  return (
    <div className={styles['header']}>
      <span className={styles['dashboardName']}>내 대시보드</span>
      <div className={styles['management']}>
        <div className={styles['user']}>
          <div className={styles['profile']}>
            <Image layout="fill" src={profileImageUrl} alt="프로필 이미지" />
          </div>
          <span>{nickname}</span>
        </div>
      </div>
    </div>
  );
}
