import styles from './headerMyDashboard.module.scss';
import classNames from 'classnames/bind';
import HeaderBtn from '@/components/atoms/buttons/headerBtn';
import Image from 'next/image';
import ProfileIcon from '@/components/atoms/profileIcon/ProfileIcon';
import { useState } from 'react';
import Link from 'next/link';

const cn = classNames.bind(styles);

export default function HeaderMyDashboard({
  enName = 'Name',
  koName = '이름',
  boardTitle = '내 대시보드',
  isMyDashboard = true,
  isNotDashboardHome = true,
}) {
  const [isOpenNicknameMenu, setIsOpenNicknameMenu] = useState(false);
  console.log(isNotDashboardHome);
  return (
    <>
      <div
        className={cn(
          { header: isNotDashboardHome },
          { dashboardHomeHeader: !isNotDashboardHome },
        )}
      >
        <div
          className={cn(
            { boardTitle: isNotDashboardHome },
            { dashboardHomeBorderTitle: !isNotDashboardHome },
          )}
        >
          <span>{boardTitle}</span>
          {isNotDashboardHome && isMyDashboard && (
            <Image
              src="/assets/icon/crownIcon.svg"
              width={20}
              height={16}
              alt="crown"
            />
          )}
        </div>
        <div className={styles['headerRight']}>
          {isNotDashboardHome && isMyDashboard && (
            <div className={styles['headerBtn']}>
              <HeaderBtn name="관리" type="edit" />
              <HeaderBtn name="초대하기" type="invite" />
            </div>
          )}
          {isNotDashboardHome && <div className={styles['line']}></div>}
          <div className={styles['invited']}></div>
          <button
            className={styles['userProfile']}
            onClick={() => setIsOpenNicknameMenu((preState) => !preState)}
            onBlur={() => setTimeout(() => setIsOpenNicknameMenu(false), 100)}
          >
            <ProfileIcon name={enName} />
            <span className={styles['koName']}>{koName}</span>
            {isOpenNicknameMenu && (
              <div
                className={styles['nicknameMenu']}
                onBlur={() => setIsOpenNicknameMenu(false)}
              >
                <button className={styles['menuItem']}>
                  <Link href="/mypage">마이페이지</Link>
                </button>
                <hr />
                <button className={cn('menuItem', 'logout')}>
                  <Link href="/">로그아웃</Link>
                </button>
              </div>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
