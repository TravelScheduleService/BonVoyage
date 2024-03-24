import { ProfileDownProps } from '@/@types/type';
import DefaultProfileImage from '@/components/atoms/defaultProfileImage';
import useAuth from '@/hooks/useAuth';
import classNames from 'classnames/bind';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './profileDropdown.module.scss';

const cn = classNames.bind(styles);

const ProfileDown = ({ onBlur }: ProfileDownProps) => {
  const { userInfo } = useAuth();
  const handleLogout = async () => {
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('user');
    await signOut({ callbackUrl: '/' });
  };

  return (
    <div className={cn('nicknameMenu')} onBlur={onBlur}>
      {userInfo.profileImageUrl ? (
        <Image
          src={userInfo.profileImageUrl}
          alt="userImage"
          width={80}
          height={80}
          className={cn('profileImage')}
        />
      ) : (
        <DefaultProfileImage />
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
