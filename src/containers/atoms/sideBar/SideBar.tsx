import Link from 'next/link';
import styles from './sideBar.module.scss';
import Image from 'next/image';
import logo from '../../../../public/assets/icon/logo.svg';
import taskify from '../../../../public/assets/icon/taskify.svg';
import addBoxIcon from '../../../../public/assets/icon/addBoxIcon.svg';
import SideBarMenu from '../sideBarMenu/SideBarMenu';

export default function SideBar() {
  return (
    <div className={styles['sidebar']}>
      <div className={styles['logoArea']}>
        <Image src={logo}></Image>
        <Image className={styles['logoText']} src={taskify}></Image>
      </div>
      <div className={styles['menuArea']}>
        <div className={styles['menuTitleArea']}>
          <h1 className={styles['menuTitle']}>Dash Boards</h1>
          <Image src={addBoxIcon}></Image>
        </div>
        <SideBarMenu></SideBarMenu>
      </div>
    </div>
  );
}
