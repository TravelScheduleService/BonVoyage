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
import { Column } from '@/@types/type';

interface CardSectionProps {
  dashboardId: number;
}

export default function CardSection({ dashboardId }: CardSectionProps) {
  const [isCreateCardModalOpen, setIsCreateCardModalOpen] = useState(false);
  const [isEditColumnModalOpen, setIsEditColumnModalOpen] = useState(false);
  const [columns, setColumns] = useState<Column[]>([]);
  const [selectedColumn, setSelectedColumn] = useState<Column | null>(null);

  async function getColumns() {
    try {
      const res = await instance.get<{ data: Column[] }>(
        `/columns?dashboardId=${dashboardId}`,
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
          },
        },
      );
      setColumns(res.data.data);
    } catch (error) {
      console.error('Error fetching columns:', error);
    }
  }

  const handleAddCardButtonClick = (column: Column) => {
    setSelectedColumn(column);
    setIsCreateCardModalOpen(true);
  };

  const handleSettingButtonClick = (column: Column) => {
    setSelectedColumn(column);
    setIsEditColumnModalOpen(true);
  };

  const closeModal = () => {
    setSelectedColumn(null);
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
              onClick={() => handleSettingButtonClick(column)}
              className={styles['settingIcon']}
              src={settingIcon}
              alt="Setting Icon"
            />
          </div>
          <EventDashboardBtn
            type="addTodo"
            onClick={() => handleAddCardButtonClick(column)}
          />
          <Card columnId={column.id} columnTitle={column.title} />
        </div>
      ))}
      {isCreateCardModalOpen && (
        <CreateCardModal column={selectedColumn!} onClose={closeModal} />
      )}
      {isEditColumnModalOpen && selectedColumn && (
        <EditColumnModal
          onClose={closeModal}
          getColumns={getColumns}
          columnName={selectedColumn.title}
          columnId={selectedColumn.id}
        />
      )}
    </div>
  );
}
