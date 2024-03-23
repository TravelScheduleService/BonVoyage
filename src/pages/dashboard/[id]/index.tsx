import EventDashboardBtn from '@/components/atoms/buttons/eventDashboardBtn';
import SideBar from '@/components/atoms/sideBar/SideBar';
import CardSection from '@/components/molecules/cardSection/CardSection';
import HeaderMyDashboard from '@/components/molecules/header/headerMyDashboard/HeaderMyDashboard';
import CreateColumnModal from '@/components/molecules/modals/createColumnModal/CreateColumnModal';
import styles from '@/styles/dashboard.module.scss';
import { useRouter } from 'next/router';
import { User } from '@/@types/type';
import React, { useEffect, useState } from 'react';
import { Column } from '@/@types/type';
import instance from '@/api/axios';
import { compileString } from 'sass';

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dashboard, setDashboard] = useState();
  const [user, setUser] = useState<User | null>(null);
  const [columns, setColumns] = useState<Column[]>([]);
  const router = useRouter();
  const { id } = router.query;

  async function getDashboard(targetId: string) {
    const res = await instance.get(`/dashboards/${targetId}`);
    const nextDashboard = res.data;
    setDashboard(nextDashboard);
  }

  async function getColumns() {
    try {
      const res = await instance.get<{ data: Column[] }>(
        `/columns?dashboardId=${id}`,
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        },
      );
      setColumns(res.data.data);
      console.log(res.data.data);
    } catch (error) {
      console.error('Error fetching columns:', error);
    }
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
    getColumns();
  }, [id]);

  if (!dashboard) return null;

  return (
    <div className={styles['background']}>
      <HeaderMyDashboard boardTitle={dashboard.title} isDashboard={true} />
      <SideBar />
      <section className={styles['section']}>
        {/* <CardSection dashboardId={id} /> */}
        <CardSection columns={columns} getColumns={getColumns} />

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
          getColumns={getColumns}
        ></CreateColumnModal>
      )}
    </div>
  );
}
