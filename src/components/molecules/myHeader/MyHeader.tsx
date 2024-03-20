import styles from './myHeader.module.scss';
import classNames from 'classnames/bind';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import ProfileDown from '../profileDropdown/index';

const cn = classNames.bind(styles);

interface Props {
  title?: string;
  profileImageUrl: string;
  nickname: string;
}

export default function MyHeader({
  title = '내 대시보드',
  profileImageUrl,
  nickname,
}: Props) {
  const [isOpenNicknameMenu, setIsOpenNicknameMenu] = useState(false);

  const onBlurName = () => {
    setTimeout(() => setIsOpenNicknameMenu(false), 100);
  };

  return (
    <div className={cn('header')}>
      <span className={cn('dashboardName')}>{title}</span>
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
              <ProfileDown onBlur={() => setIsOpenNicknameMenu(false)}/>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
