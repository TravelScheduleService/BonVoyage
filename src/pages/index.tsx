import styles from '@/styles/Home.module.scss';
import HeaderAuth from '@/components/molecules/header/headerAuth/HeaderAuth';
import LandingHeader from '@/components/molecules/landing/landingHeader';
import LandingMain from '@/components/molecules/landing/landingMain';
import LandingFooter from '@/components/molecules/landing/landingFooter';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import LandingCarousel from '@/components/molecules/landing/landingCarousel/index';
import back1 from '@/../../public/assets/image/back1.jpg';
import back2 from '@/../../public/assets/image/back2.jpg';
import back3 from '@/../../public/assets/image/back3.jpg';
import back4 from '@/../../public/assets/image/back4.jpg';
import back5 from '@/../../public/assets/image/back5.jpg';

const index = () => {
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem('accessToken');
    if (token) {
      router.push('/mydashboard');
    }
  }, []);

  const CarouselImages = [back1, back2, back3, back4, back5]

  return (
    <div className={styles.container}>
      <HeaderAuth />
      <div className={styles.mainContent}>
        <LandingHeader />
        <LandingCarousel carouselList={CarouselImages} />
        <LandingMain />
      </div>
      <LandingFooter />
    </div>
  );
};

export default index;
