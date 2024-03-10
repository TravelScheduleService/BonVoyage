import Link from "next/link";
import styles from "./sideBarMenu.module.scss";

interface SideBarMenuProps {
  menuTitle: string;
}

export default function SideBarMenu({ menuTitle }: SideBarMenuProps) {
  return (
    <div className={styles["sidebarMenu"]}>
      <Link href="/">
        <a className={styles["menuTitle"]}>{menuTitle}</a>
      </Link>
    </div>
  );
}
