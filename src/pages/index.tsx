import styles from '@/styles/Home.module.scss';
import HeaderAuth from '@/components/molecules/header/headerAuth/HeaderAuth';
import LandingHeader from '@/components/molecules/landing/landingHeader';
import LandingMain from '@/components/molecules/landing/landingMain';
import LandingFooter from '@/components/molecules/landing/landingFooter';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const index = () => {
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem('accessToken');
    if (token) {
      router.push('/mydashboard');
    }
  }, []);
  // 로그인 되어있으면 mydashboard로 이동

  return (
    <div className={styles.container}>
      <HeaderAuth />
      <div className={styles.mainContent}>
        <LandingHeader />
        <LandingMain />
      </div>
      <LandingFooter />
    </div>
  );
};

export default index;
