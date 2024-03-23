import useAuth from '@/hooks/useAuth';
import styles from './DefaultProfileImage.module.scss';

const DefaultProfileImage = () => {
  const { userInfo } = useAuth();
  const firstName = userInfo.nickname.slice(0, 1);

  return <div className={styles.container}>{firstName}</div>;
};

export default DefaultProfileImage;
