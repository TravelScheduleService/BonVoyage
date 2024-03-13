import Link from 'next/link';
import styles from './logoWithTitle.module.scss';
import Image from 'next/image';
import { useMediaQuery } from 'react-responsive';

export default function LogoWithTitle() {
  const notMobile = useMediaQuery({ minWidth: 375 });

  return (
    <>
      <div className={styles['logo']}>
        <Link href={'/'}>
          <Image
            src="/assets/icon/logo.svg"
            width={23}
            height={27}
            alt="logo"
          />
        </Link>
        {notMobile && (
          <Link href={'/'}>
            <Image
              src="/assets/icon/taskify.svg"
              width={80}
              height={22}
              alt="taskify"
            />
          </Link>
        )}
      </div>
    </>
  );
}
