import Image from 'next/image';
import styles from './profileIcon.module.scss';

type props = {
  name: string;
  profile?: string;
};

export default function ProfileIcon({ name, profile }: props) {
  const firstCharacter = name?.slice(0, 1);

  return (
    <div className={styles['icon']}>
      {profile ? (
        <div className={styles['image']}>
          <Image
            // layout="fill"
            src={profile}
            alt="프로필 이미지"
            priority={true}
            objectFit="cover"
          />
        </div>
      ) : (
        firstCharacter
      )}
    </div>
  );
}
