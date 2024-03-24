import { Column } from '@/@types/type';
import ColumnComponent from '@/components/atoms/column/ColumnComponent';
import { useState } from 'react';
import CreateCardModal from '../modals/createCardModal/CreateCardModal';
import EditColumnModal from '../modals/editColumnModal/EditColumnModal';
import styles from './cardSection.module.scss';

interface CardSectionProps {
  columns: Column[];
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
        <ColumnComponent
          key={column.id}
          column={column}
          columns={columns}
          handleSettingButtonClick={handleSettingButtonClick}
          handleAddCardButtonClick={handleAddCardButtonClick}
        />
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
