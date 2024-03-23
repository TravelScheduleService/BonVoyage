import styles from './cardSection.module.scss';
import React, { useState } from 'react';
import CreateCardModal from '../modals/createCardModal/CreateCardModal';
import EditColumnModal from '../modals/editColumnModal/EditColumnModal';
import Column from '@/components/atoms/column/Column';

interface Column {
  id: number;
  title?: string;
  teamId: string;
  dashboardId: number;
  createdAt?: string;
  updatedAt?: string;
}

interface CardSectionProps {
  columns: [];
  getColumns: () => void;
}

export default function CardSection({ columns, getColumns }: CardSectionProps) {
  const [isCreateCardModalOpen, setIsCreateCardModalOpen] = useState(false);
  const [isEditColumnModalOpen, setIsEditColumnModalOpen] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState<Column | null>(null);

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
