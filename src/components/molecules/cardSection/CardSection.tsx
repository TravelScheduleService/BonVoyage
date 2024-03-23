import styles from './cardSection.module.scss';
import React, { useEffect, useState } from 'react';
import CreateCardModal from '../modals/createCardModal/CreateCardModal';
import EditColumnModal from '../modals/editColumnModal/EditColumnModal';
import instance from '@/api/axios';

import Column from '@/components/atoms/column/Column';

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
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
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
        <Column
          column={column}
          handleSettingButtonClick={handleSettingButtonClick}
          handleAddCardButtonClick={handleAddCardButtonClick}
        ></Column>
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
