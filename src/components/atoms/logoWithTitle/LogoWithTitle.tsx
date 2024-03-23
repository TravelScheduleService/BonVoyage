import Link from 'next/link';
import Image from 'next/image';
import styles from './logoWithTitle.module.scss';

export default function LogoWithTitle() {
  let getToken = '';

  if (typeof window !== 'undefined') {
    getToken = sessionStorage.getItem('accessToken') ?? '';
  }

  return (
    <>
      <div className={styles['logo']}>
        <Link href={getToken ? '/mydashboard' : '/'}>
          <Image
            src="/assets/icon/bonVoyageLogo.svg"
            width={230}
            height={66}
            alt="logo"
          />
        </Link>
      </div>
      <div className={styles['mobileLogo']}>
        <Link href={getToken ? '/mydashboard' : '/'}>
          <Image
            src="/assets/icon/logo.svg"
            width={30}
            height={30}
            alt="logo"
          />
        </Link>
      </div>
    </>
  );
}
