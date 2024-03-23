import React from 'react';
import SideBar from '@/components/atoms/sideBar/SideBar';
import styles from './layout.module.scss';
import HeaderMyDashboard from '@/components/molecules/header/headerMyDashboard/HeaderMyDashboard';

const Layout = () => {
  return (
    <div className={styles.container}>
      <HeaderMyDashboard
        boardTitle={'계정관리'}
      />
      <SideBar />
    </div>
  );
};

export default Layout;
