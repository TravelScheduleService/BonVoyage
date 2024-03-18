import styles from './errprPage.module.scss';
import errorPage from '@/../../public/assets/icon/errorPage.png';
import Image from 'next/image';
import { useRouter } from 'next/router';
import bonVoyageLofo from '@/../../public/assets/icon/bonVoyageLogo.svg';

const ErrorPage = () => {
  const router = useRouter();

  const back = () => {
    router.back();
  };
  return (
    <div className={styles.container}>
      <Image src={bonVoyageLofo} alt="bonVoyageLofo" width={400} height={200} />
      <div className={styles.errprContainer}>
        <Image src={errorPage} alt="errorPage" width={100} height={100} />
        <p className={styles.errorText}>
          죄송합니다.
          <br />
          요청하신 페이지를 찾을 수 없습니다.
        </p>
        <div className={styles.errorTextUnder}>
          <span className={styles.spanText}>Error : 404 Not Found Error</span>
          <button className={styles.errorButton} onClick={back}>
            이전 페이지로
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
