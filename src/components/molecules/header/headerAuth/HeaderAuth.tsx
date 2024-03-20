import Link from 'next/link';
import styles from './headerAuth.module.scss';
import LogoWithTitle from '@/components/atoms/logoWithTitle/LogoWithTitle';

export default function HeaderAuth() {
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
