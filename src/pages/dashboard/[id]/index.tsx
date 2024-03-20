import EventDashboardBtn from '@/components/atoms/buttons/eventDashboardBtn';
import SideBar from '@/components/atoms/sideBar/SideBar';
import CardSection from '@/components/molecules/cardSection/CardSection';
import CreateColumnModal from '@/components/molecules/modals/createColumnModal/CreateColumnModal';
import MyHeader from '@/components/molecules/myHeader/MyHeader';
import styles from '@/styles/dashboard.module.scss';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

interface Props {
  targetId: string;
}

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dashboard, setDashboard] = useState();
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

  if (!dashboard) return null;

  return (
    <div className={styles['background']}>
      <MyHeader profileImageUrl="/assets/icon/logo.svg" nickname="배유철" />
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
