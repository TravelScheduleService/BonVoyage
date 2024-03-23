import { ProfileDownProps } from '@/@types/type';
import classNames from 'classnames/bind';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './profileDropdown.module.scss';

const cn = classNames.bind(styles);

const ProfileDown = ({ onBlur }: ProfileDownProps) => {
  const router = useRouter();
  const handleLogout = async () => {
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('user');
    await signOut({ callbackUrl: '/' });
  };

  return (
    <div className={cn('nicknameMenu')} onBlur={onBlur}>
      <button className={cn('menuItem')}>
        <Link href="/myPage">마이페이지</Link>
      </button>
      <hr />
      <button className={cn('menuItem', 'logout')} onClick={handleLogout}>
        로그아웃
      </button>
    </div>
  );
};

export default ProfileDown;
