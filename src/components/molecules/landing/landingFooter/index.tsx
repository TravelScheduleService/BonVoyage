import styles from '../landingFooter/landingFooter.module.scss';
import whiteEmailIcon from '@/../../public/assets/icon/whiteEmailIcon.svg';
import whiteFacebookIcon from '@/../../public/assets/icon/whiteFacebook.svg';
import whiteInstagramIcon from '@/../../public/assets/icon/whiteInstragram.svg';
import Image from 'next/image';
const LandingFooter = () => {
  return (
    <div className={styles.container}>
        <p>@ BonVoyage</p>
        <div className={styles.footerText}>
          <span>Privacy Policy</span>
          <span>FAQ</span>
        </div>
      <div className={styles.footerlogo}>
        <Image src={whiteEmailIcon} alt="emailIcon" width={25} height={25} />
        <Image src={whiteFacebookIcon} alt="emailIcon" width={25} height={25} />
        <Image
          src={whiteInstagramIcon}
          alt="emailIcon"
          width={25}
          height={25}
        />
      </div>
    </div>
  );
};

export default LandingFooter;
