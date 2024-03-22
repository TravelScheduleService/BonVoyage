import HeaderBtn from '@/components/atoms/buttons/headerBtn';
import ProfileIcon from '@/components/atoms/profileIcon/ProfileIcon';
import ProfileDown from '@/components/molecules/profileDropdown/index';
import useAuth from '@/hooks/useAuth';
import classNames from 'classnames/bind';
import Image from 'next/image';
import { useState } from 'react';
import styles from './headerMyDashboard.module.scss';

const cn = classNames.bind(styles);

interface Props {
  name?: string;
  boardTitle?: string;
  profile?: string;
  isDashboard?: boolean;
  ismyDashboard?: boolean;
}

export default function HeaderMyDashboard({
  name = '이름',
  boardTitle = '내 대시보드',
  profile,
  isDashboard = false,
  ismyDashboard = false,
}: Props) {
  const { userInfo } = useAuth();
  const [isOpenNicknameMenu, setIsOpenNicknameMenu] = useState(false);

  return (
    <>
      <div
        className={cn(
          { header: isDashboard },
          { dashboardHomeHeader: !isDashboard },
        )}
      >
        <div
          className={cn(
            { boardTitle: isDashboard },
            { dashboardHomeBorderTitle: !isDashboard },
          )}
        >
          <span>{boardTitle}</span>
          {isDashboard && (
            <>
              <Image
                src="/assets/icon/crownIcon.svg"
                width={20}
                height={16}
                alt="crown"
              />
            </>
          )}
        </div>
        <div className={styles['headerRight']}>
          {isDashboard && (
            <div className={styles['headerBtn']}>
              <HeaderBtn name="관리" type="edit" />
              <HeaderBtn name="초대하기" type="invite" />
            </div>
          )}
          {isDashboard && <div className={styles['line']}></div>}
          <div className={styles['invited']}></div>
          <button
            className={styles['userProfile']}
            onClick={() => setIsOpenNicknameMenu((preState) => !preState)}
            onBlur={() => setTimeout(() => setIsOpenNicknameMenu(false), 100)}
          >
            <ProfileIcon name={name} profile={userInfo?.profileImageUrl} />
            <span className={styles['name']}>{userInfo.nickname}</span>
            {isOpenNicknameMenu && (
              <ProfileDown onBlur={() => setIsOpenNicknameMenu(false)} />
            )}
          </button>
        </div>
      </div>
    </>
  );
}
