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
    <div className={cn('nicknameMenu')}>
      {userInfo.profileImageUrl ? (
        <Image
          src={userInfo.profileImageUrl}
          alt="userImage"
          width={80}
          height={80}
          className={cn('profileImage')}
        />
      ) : (
        <DefaultProfileImage/>
      )}
      <span>{userInfo.nickname}</span>
      <span>{userInfo.email}</span>
      <div className={cn('btnContainer')}>
        <Link href="/myPage">
          <button className={cn('menuItem')}>MyPage</button>
        </Link>
        <button className={cn('menuItem', 'logout')} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileDown;
