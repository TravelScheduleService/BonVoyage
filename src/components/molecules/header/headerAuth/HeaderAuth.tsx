import Link from 'next/link';
import styles from './headerAuth.module.scss';
import LogoWithTitle from '@/components/atoms/logoWithTitle/LogoWithTitle';

export default function HeaderAuth() {
  return (
    <>
      <div className={styles['header']}>
        <LogoWithTitle />

        <div className={styles['authButton']}>
          <Link href={'/'}>로그인</Link>
          <Link href={'/'}>회원가입</Link>
        </div>
      </div>
    </>
  );
}
