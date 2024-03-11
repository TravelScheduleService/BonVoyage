import Link from 'next/link';
import styles from './sideBarMenu.module.scss';

interface SideBarMenuProps {
  menuTitle: string;
  path: string;
}

export default function SideBarMenu({ menuTitle, path }: SideBarMenuProps) {
  return (
    <div className={styles['sidebarMenu']}>
      <Link href={`"${path}"`}>
        <a className={styles['menuTitle']}>{menuTitle}</a>
      </Link>
    </div>
  );
}
