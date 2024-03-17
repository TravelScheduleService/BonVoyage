import styles from './myHeader.module.scss';
import classNames from 'classnames/bind';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const cn = classNames.bind(styles);

interface Props {
  profileImageUrl: string;
  nickname: string;
}

export default function MyHeader({ profileImageUrl, nickname }: Props) {
  const [isOpenNicknameMenu, setIsOpenNicknameMenu] = useState(false);

  // const userInfo = useContext(userContext);

  const onBlurName = () => {
    setTimeout(() => setIsOpenNicknameMenu(false), 100);
  };

  return (
    <div className={cn('header')}>
      <span className={cn('dashboardName')}>내 대시보드</span>
      <div className={cn('management')}>
        <div className={cn('user')}>
          <div className={cn('profile')}>
            <Image layout="fill" src={profileImageUrl} alt="프로필 이미지" />
          </div>
          <div className={cn('name')}>
            <button
              className={cn('nickname')}
              onClick={() => setIsOpenNicknameMenu((preState) => !preState)}
              onBlur={onBlurName}
            >
              {nickname}
            </button>
            {isOpenNicknameMenu && (
              <div
                className={cn('nicknameMenu')}
                onBlur={() => setIsOpenNicknameMenu(false)}
              >
                <button className={cn('menuItem')}>
                  <Link href="/myPage">마이페이지</Link>
                </button>
                <hr />
                <button className={cn('menuItem', 'logout')}>
                  <Link href="/">로그아웃</Link>
                </button>
              </div>
            )}
          </div>
          {/* <span>{userInfo.nickname}</span> */}
        </div>
      </div>
    </div>
  );
}
