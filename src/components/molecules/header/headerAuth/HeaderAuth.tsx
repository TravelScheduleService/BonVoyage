import LogoWithTitle from '@/components/atoms/logoWithTitle/LogoWithTitle';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import styles from './headerAuth.module.scss';

export default function HeaderAuth() {
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem('accessToken');
    if (token) {
      router.push('/mydashboard');
    }
  }, []);
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
