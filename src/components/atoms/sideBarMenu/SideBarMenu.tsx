import Link from 'next/link';
import styles from './sideBarMenu.module.scss';
import ColorDot from '../colorDot/ColorDot';

interface SideBarMenuProps {
  menuTitle?: string;
  path?: string;
}

export default function SideBarMenu({ menuTitle, path }: SideBarMenuProps) {
  return (
    <div className={styles['sidebarMenu']}>
      <ColorDot colorName="orange"></ColorDot>
      <Link href={`"${path}"`}>
        <a className={styles['menuTitle']}>{menuTitle}</a>
      </Link>
      <img
        className={styles['crownIcon']}
        src={'/assets/icon/crownIcon.svg'}
      ></img>
    </div>
  );
}
