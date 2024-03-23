import { useContext } from 'react';
import { userContext } from '@/pages/_app';
import styles from './DefaultProfileImage.module.scss';

const DefaultProfileImage = () => {
  const { userInfo } = useContext(userContext);
  const firstName = userInfo.nickname.slice(0, 1);

  return (
    <div className={styles.container}>{firstName}</div>
  )
}

export default DefaultProfileImage
