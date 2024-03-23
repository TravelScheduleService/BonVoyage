import SideBar from '@/components/atoms/sideBar/SideBar';
import styles from './myDashboard.module.scss';
import classNames from 'classnames/bind';
import Image from 'next/image';
import { MouseEvent, useEffect, useRef, useState } from 'react';
import { Dashboard, Invitation, User } from '@/@types/type';
import MyDashboardList from '@/components/molecules/myDashboardList/MyDashboardList';
import InvitedDashboardList from '@/components/molecules/invitedDashboardList/InvitedDashboardList';
import {
  getInvitedDashboardList,
  getMyDashboardList,
  putInviteAnswer,
} from '@/api/dashboardListApi/dashboardListApi';
import HeaderMyDashboard from '@/components/molecules/header/headerMyDashboard/HeaderMyDashboard';

const cn = classNames.bind(styles);

export default function MyDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [dashboardList, setDashboardList] = useState<Dashboard[]>([]);
  const [dashboardListPage, setDashboardListPage] = useState(1);
  const [dashboardListTotalPage, setDashboardListTotalPage] = useState(0);
  const [invitedDashboardList, setInvitedDashboardList] = useState<
    Invitation[]
  >([]);
  const [stateForUpdate, setStateForUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMoreData, setIsMoreData] = useState(true);
  const cursorId = useRef<number>(0);

  const onClickPageButtonLeft = () => {
    setIsLoading(true);
    setDashboardListPage((prevPage) => prevPage - 1);
  };

  const onClickPageButtonRight = () => {
    setIsLoading(true);
    setDashboardListPage((prevPage) => prevPage + 1);
  };

  const onClickInviteAnswer = async (
    e: MouseEvent<HTMLButtonElement>,
    id: number,
  ) => {
    const target = e.target as HTMLButtonElement;
    const answer = target.value === 'true';
    putInviteAnswer(id, answer);

    setInvitedDashboardList((preList) => [
      ...preList.filter((element) => element.id !== id),
    ]);
    setIsLoading(true);
    setStateForUpdate((preStatus) => !preStatus);
  };

  async function setMyInvitedDashboardList() {
    if (!isMoreData) {
      return;
    }

    setIsLoading(true);
    const params = cursorId.current
      ? { size: 10, cursorId: cursorId.current }
      : { size: 10 };

    try {
      const response = await getInvitedDashboardList(params);

      if (!response.cursorId) {
        setIsMoreData(false);
      }

      setInvitedDashboardList((preArray) => {
        let nextList: Invitation[];
        if (
          preArray.length > 0 &&
          response.cursorId <= preArray[preArray.length - 1].id
        ) {
          nextList = [
            ...preArray,
            ...response.invitations.filter((newItem: Invitation) => {
              return !preArray.some((element) => element.id === newItem.id);
            }),
          ];
        } else {
          nextList = [...preArray, ...response.invitations];
        }

        return nextList;
      });

      if (response.cursorId) {
        cursorId.current = response.cursorId;
      } else {
        cursorId.current = 0;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  let invitation;

  if (invitedDashboardList.length) {
    invitation = (
      <InvitedDashboardList
        invitedDashboardList={invitedDashboardList}
        isLoading={isLoading}
        isMoreData={isMoreData}
        onClickInviteAnswer={onClickInviteAnswer}
        getInivtedDashboardList={setMyInvitedDashboardList}
      />
    );
  } else {
    invitation = (
      <div className={cn('empty')}>
        <div className={cn('emptyMessage')}>
          <Image
            layout="fill"
            src="/assets/icon/unsubscribeIcon.svg"
            alt="편지지 아이콘"
            priority={true}
            objectFit="cover"
          />
        </div>
        <span>아직 초대받은 대시보드가 없어요</span>
      </div>
    );
  }

  useEffect(() => {
    const user = sessionStorage.getItem('user');
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  useEffect(() => {
    async function setMyDashboardList() {
      try {
        const response = await getMyDashboardList(dashboardListPage);

        setDashboardListTotalPage(Math.ceil(response.totalCount / 5));
        setDashboardList(response.dashboards);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    setMyDashboardList();
    setMyInvitedDashboardList();
  }, [dashboardListPage, stateForUpdate]);

  return (
    <div className={cn('background')}>
      <HeaderMyDashboard
        name={user?.nickname}
        profile={user?.profileImageUrl}
        ismyDashboard={true}
      />
      <SideBar />
      <section className={cn('section')}>
        <MyDashboardList
          dashboardList={dashboardList}
          dashboardListPage={dashboardListPage}
          dashboardListTotalPage={dashboardListTotalPage}
          onClickPageButtonLeft={onClickPageButtonLeft}
          onClickPageButtonRight={onClickPageButtonRight}
        />
        <div className={cn('invitedDashboardList')}>
          <span>초대받은 대시보드</span>
          {invitation}
        </div>
      </section>
    </div>
  );
}
