import back1 from '@/../../public/assets/image/back1.jpg';
import back2 from '@/../../public/assets/image/back2.jpg';
import back3 from '@/../../public/assets/image/back3.jpg';
import back4 from '@/../../public/assets/image/back4.jpg';
import back5 from '@/../../public/assets/image/back5.jpg';
import HeaderAuth from '@/components/molecules/header/headerAuth/HeaderAuth';
import LandingCarousel from '@/components/molecules/landing/landingCarousel/index';
import LandingFooter from '@/components/molecules/landing/landingFooter';
import LandingHeader from '@/components/molecules/landing/landingHeader';
import LandingMain from '@/components/molecules/landing/landingMain';
import styles from '@/styles/Home.module.scss';
import { getSession } from 'next-auth/react';

export async function getServerSideProps(ctx: any) {
  const session = await getSession(ctx);
  return { props: { session } };
}

const Index = () => {
  const CarouselImages = [back1, back2, back3, back4, back5];

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

export default Index;
