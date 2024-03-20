import SideBar from '@/components/atoms/sideBar/SideBar';
import EditDashboardTitle from '@/components/molecules/editDashboardName/EditDashboardTitle';
import HeaderMyDashboard from '@/components/molecules/header/headerMyDashboard/HeaderMyDashboard';
import InviteList from '@/components/molecules/inviteList/InviteList';
import Members from '@/components/molecules/members/Members';
import styles from '@/styles/editDashboard.module.scss';
import React from 'react';
import { useRouter } from 'next/router';
import leftArrowIcon from '/public/assets/icon/leftArrowIcon.svg';
import Image from 'next/image';
import EventDashboardBtn from '@/components/atoms/buttons/eventDashboardBtn';

export default function editdashboard() {
  const router = useRouter();
  const goBack = () => {
    router.back();
  };
  return (
    <div className={styles['background']}>
      <HeaderMyDashboard />
      <SideBar />
      <div className={styles['components']}>
        <button className={styles.return} onClick={goBack}>
          <Image src={leftArrowIcon} alt="돌아가기" width={20} height={20} />
          돌아가기
        </button>
        <EditDashboardTitle />
        <Members />
        <InviteList />
        <EventDashboardBtn name="대시보드 삭제하기" type="deleteDashboard" />
      </div>
    </div>
  );
}
