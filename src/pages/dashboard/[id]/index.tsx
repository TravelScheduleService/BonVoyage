import EventDashboardBtn from '@/components/atoms/buttons/eventDashboardBtn';
import SideBar from '@/components/atoms/sideBar/SideBar';
import CardSection from '@/components/molecules/cardSection/CardSection';
import HeaderMyDashboard from '@/components/molecules/header/headerMyDashboard/HeaderMyDashboard';
import CreateColumnModal from '@/components/molecules/modals/createColumnModal/CreateColumnModal';
import styles from '@/styles/dashboard.module.scss';
import axios from 'axios';
import { useRouter } from 'next/router';
import { User } from '@/@types/type';
import React, { useEffect, useState } from 'react';

interface Props {
  targetId: string;
}

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dashboard, setDashboard] = useState();
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const { id } = router.query;

  async function getDashboard({ targetId }: Props) {
    const res = await axios.get(`/dashboard/${targetId}`);
    const nextDashboard = res.data;
    setDashboard(nextDashboard);
  }

  const handleaddColumnButtonClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (!id) return;
    getDashboard(id);
  }, [id]);

  useEffect(() => {
    const user = sessionStorage.getItem('user');
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  if (!dashboard) return null;

  return (
    <div className={styles['background']}>
      <HeaderMyDashboard
        name={user?.nickname}
        profile={user?.profileImageUrl}
        boardTitle={dashboard}
        isDashboard={true}
      />
      <SideBar />
      <section className={styles['section']}>
        <CardSection dashboardId={id} />
        <div className={styles['newColumnArea']}>
          <EventDashboardBtn
            onClick={handleaddColumnButtonClick}
            name="새로운 컬럼 추가하기"
            type="addColumn"
          />
        </div>
      </section>
      {isModalOpen && (
        <CreateColumnModal
          onClose={closeModal}
          dashboardId={Number(id)}
        ></CreateColumnModal>
      )}
    </div>
  );
}
