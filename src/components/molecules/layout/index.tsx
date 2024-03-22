import React from 'react';
import SideBar from '@/components/atoms/sideBar/SideBar';
import styles from './layout.module.scss';
import MyHeader from '../myHeader/MyHeader';
import HeaderMyDashboard from '@/components/molecules/header/headerMyDashboard/HeaderMyDashboard';
import { useContext } from 'react';
import { userContext } from '@/pages/_app';

const Layout = () => {
  const { userInfo } = useContext(userContext);
  console.log(userInfo)

  return (
    <div className={styles.container}>
      <MyHeader
        title="계정관리"
        nickname={userInfo.nickname}
        profileImageUrl={userInfo.profileImageUrl}
      />
      {/* <HeaderMyDashboard boardTitle={"계정관리"}  koName={userInfo.nickname} profile={userInfo.profileImageUrl}/> */}
      {/* <HeaderMyDashboard enName={userInfo.profileImageUrl} boardTitle={"계정관리"} koName={userInfo.nickname}/> */}
      <SideBar />
    </div>
  );
};

export default Layout;
