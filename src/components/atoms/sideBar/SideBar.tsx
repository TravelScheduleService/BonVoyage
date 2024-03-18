import styles from './sideBar.module.scss';
import Image from 'next/image';

import addBoxIcon from '../../../../public/assets/icon/addBoxIcon.svg';
import SideBarMenu from '../sideBarMenu/SideBarMenu';
import Link from 'next/link';
import LogoWithTitle from '../logoWithTitle/LogoWithTitle';

interface prop {
  path?: string;
}
export default function SideBar({ path }: prop) {
  return (
    <div className={styles['sidebar']}>
      <div className={styles['logoArea']}>
        <LogoWithTitle />
      </div>
      <div className={styles['menuArea']}>
        <div className={styles['menuTitleArea']}>
          <h1 className={styles['menuTitle']}>Dash Boards</h1>
          <Image src={addBoxIcon}></Image>
        </div>
        <Link href={`${path}`}>
          <SideBarMenu menuTitle="코드잇" />
        </Link>
      </div>
    </div>
  );
}
