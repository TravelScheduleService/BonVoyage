import LogoWithTitle from '@/components/atoms/logoWithTitle/LogoWithTitle';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import styles from './headerAuth.module.scss';

export default function HeaderAuth() {
  const session = useSession();
  return (
    <>
      <div className={styles['header']}>
        <LogoWithTitle />
        <div className={styles['authButton']}>
          <Link href={'/login'}>
            <div className={styles['loginBtn']}>로그인</div>
          </Link>
          <Link href={'/signUp'}>
            <div className={styles['signUpBtn']}>회원가입</div>
          </Link>
        </div>
      </div>
    </>
  );
}
