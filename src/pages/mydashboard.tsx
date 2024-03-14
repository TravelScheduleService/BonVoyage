import EventDashboardBtn from '@/components/atoms/buttons/eventDashboardBtn';
import MyDashboardBtn from '@/components/atoms/buttons/myDashboardBtn';
import SideBar from '@/components/atoms/sideBar/SideBar';
import MyHeader from '@/components/molecules/myHeader/MyHeader';
import styles from '@/styles/myDashboard.module.scss';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface Dashboard {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
  userId: number;
}

interface Invitation {
  id: number;
  inviter: {
    nickname: string;
    email: string;
    id: number;
  };
  teamId: string;
  dashboard: {
    title: string;
    id: number;
  };
  invitee: {
    nickname: string;
    email: string;
    id: number;
  };
  inviteAccepted: boolean;
  createdAt: string;
  updatedAt: string;
}

const ELLIPSE_LIST = {
  green: '/assets/icon/ellipseGreen',
  orange: '/assets/icon/ellipseOrange',
  pink: '/assets/icon/ellipsePink',
  purple: '/assets/icon/ellipsePurple',
  skyblue: '/assets/icon/ellipseSkyBlue',
};

export default function MyDashboard() {
  const [dashboardList, setDashboardList] = useState<Dashboard[]>([]);
  const [invitedDashboardList, setInvitedDashboardList] = useState<
    Invitation[]
  >([]);
  const [isMobile, setIsMobile] = useState(false); // 이름, 초대자 모바일 구분용

  let invitation;

  if (invitedDashboardList.length) {
    invitation = (
      <>
        <div className={styles['search']}>
          <div className={styles['icon']}>
            <Image
              layout="fill"
              objectFit="cover"
              src="/assets/icon/searchIcon.svg"
              alt="돋보기 아이콘"
            />
          </div>
          <input placeholder="검색" />
        </div>
        <div className={styles['columns']}>
          <span className={styles['name']}>이름</span>
          <span className={styles['invitor']}>초대자</span>
          <span className={styles['acceptOrNot']}>수락 여부</span>
        </div>
        {/* 초대된 대시보드 목록을 이용하여 내용을 채워야 합니다.
        {invitedDashboardList.map(({ invitations }) => {
          return <div className={styles['invitedDashboard']}></div>
        })} */}
      </>
    );
  } else {
    invitation = (
      <div className={styles['empty']}>
        <div className={styles['emptyMessage']}>
          <Image
            layout="fill"
            src="/assets/icon/unsubscribeIcon.svg"
            alt="편지지 아이콘"
          />
        </div>
        <span>아직 초대받은 대시보드가 없어요</span>
      </div>
    );
  }

  return (
    <div className={styles['background']}>
      <MyHeader profileImageUrl="/assets/icon/logo.svg" nickname="배유철" />
      <section className={styles['section']}>
        <div className={styles['dashboardList']}>
          <EventDashboardBtn name="새로운 대시보드" type="newDashboard" />
          {dashboardList.map((element) => {
            return <div></div>; // 대시보드 버튼으로 넣어야 됩니다.
          })}
        </div>
        <div className={styles['invitedDashboardList']}>
          <span>초대받은 대시보드</span>
          {invitation}
        </div>
      </section>
      <SideBar />
    </div>
  );
}
