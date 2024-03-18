import ChipNumber from '@/components/atoms/chipNumber/ChipNumber';
import ColorDot from '@/components/atoms/colorDot/ColorDot';
import styles from './cardSection.module.scss';
import Image from 'next/image';
import settingIcon from '../../../../public/assets/icon/settingsIcon.svg';
import EventDashboardBtn from '@/components/atoms/buttons/eventDashboardBtn';
import Card from '../card/Card';
import React, { useEffect, useState } from 'react';
import CardDetailModal from '../modals/cardDetailModal/CardDetailModal';
import CreateCardModal from '../modals/createCardModal/CreateCardModal';
import EditColumnModal from '../modals/editColumnModal/EditColumnModal';
import instance from '@/api/axios';

interface Column {
  id: number;
  title: string;
}

interface CardSectionProps {
  dashboardId: number;
}

export default function CardSection({ dashboardId }: CardSectionProps) {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isCreateCardModalOpen, setIsCreateCardModalOpen] = useState(false);
  const [isEditColumnModalOpen, setIsEditColumnModalOpen] = useState(false);
  const [columns, setColumns] = useState<Column[]>([]);

  async function getColumns() {
    try {
      const res = await instance.get<{ data: Column[] }>(
        `/columns?dashboardId=${dashboardId}`,
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        },
      );
      setColumns(res.data.data);
    } catch (error) {
      console.error('Error fetching columns:', error);
    }
  }

  const handleCardClick = () => {
    setIsDetailModalOpen(true);
  };

  const handleAddCardButtonClick = () => {
    setIsCreateCardModalOpen(true);
  };

  const handleSettingButtonClick = () => {
    setIsEditColumnModalOpen(true);
  };

  const closeModal = () => {
    setIsDetailModalOpen(false);
    setIsCreateCardModalOpen(false);
    setIsEditColumnModalOpen(false);
  };

  useEffect(() => {
    getColumns();
  }, [dashboardId]);

  return (
    <div className={styles['cardSection']}>
      {columns?.map((column) => (
        <div key={column.id} className={styles['column']}>
          <div className={styles['defaultArea']}>
            <div className={styles['titleArea']}>
              <ColorDot colorName="blue"></ColorDot>
              <h1 className={styles['title']}>{column.title}</h1>
              <ChipNumber number="3"></ChipNumber>
            </div>
            <Image
              onClick={handleSettingButtonClick}
              className={styles['settingIcon']}
              src={settingIcon}
            ></Image>
          </div>
          <EventDashboardBtn
            type="addTodo"
            onClick={handleAddCardButtonClick}
          />
          <Card columnId={column.id} onClick={handleCardClick}></Card>
        </div>
      ))}
      {isDetailModalOpen && (
        <CardDetailModal onClose={closeModal}></CardDetailModal>
      )}
      {isCreateCardModalOpen && (
        <CreateCardModal onClose={closeModal}></CreateCardModal>
      )}
      {isEditColumnModalOpen && (
        <EditColumnModal onClose={closeModal}></EditColumnModal>
      )}
    </div>
  );
}
