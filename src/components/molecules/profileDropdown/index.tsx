import React from 'react';
import classNames from 'classnames/bind';
import Link from 'next/link';
import styles from './profileDropdown.module.scss';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { userContext } from '@/pages/_app';
import Image from 'next/image';
import DefaultProfileImage from '@/components/atoms/defaultProfileImage';

const cn = classNames.bind(styles);

const ProfileDown = () => {
  const { userInfo } = useContext(userContext);
  const router = useRouter();
  const handleLogout = () => {
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('user');
    router.push('/');
  };

  return (
    <div className={cn('nicknameMenu')} onBlur={onBlur}>
      <button className={cn('menuItem')}>
        <Link href="/mypage">마이페이지</Link>
      </button>
      <hr />
      <button className={cn('menuItem', 'logout')} onClick={handleLogout}>
        로그아웃
      </button>
    </div>
  );
};

export default ProfileDown;
// onBlur?
