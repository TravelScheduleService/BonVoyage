import React, { useState } from 'react';
import styles from './editColumnModal.module.scss';
import Button from '@/components/atoms/buttons/button';
import ColumnNameInput from '@/components/atoms/input/columnNameInput/ColumnNameInput';
import DeleteColumnModal from '../deleteColumnModal/DeleteColumnModal';
import instance from '@/api/axios';

interface ModalProps {
  onClose: () => void;
  getColumns: () => void;
  columnName?: string;
  columnId: number;
}

export default function EditColumnModal({
  onClose,
  getColumns,
  columnName,
  columnId,
}: ModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedColumnName, setEditedColumnName] = useState(columnName);

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedColumnName(event.target.value);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleEditClick = async () => {
    try {
      await instance.put(`/columns/${columnId}`, { title: editedColumnName });
      getColumns();
      onClose();
    } catch (error) {
      console.error('Error updating column:', error);
    }
  };

  return (
    <div className={styles['cardDetailModal']}>
      <div className={styles['modalContent']}>
        <h1 className={styles['modalTitle']}>컬럼 관리</h1>
        <ColumnNameInput
          value={editedColumnName}
          onChange={handleInputChange}
        />
        <span className={styles['deleteButton']} onClick={handleDeleteClick}>
          삭제하기
        </span>

        <div className={styles['buttonArea']}>
          <Button name="취소" type="modal" color="white" onClick={onClose} />
          <Button
            name="변경"
            type="modal"
            color="blue"
            onClick={handleEditClick}
          />
        </div>
      </div>
      {isModalOpen && (
        <DeleteColumnModal
          onClose={closeModal}
          getColumns={getColumns}
          columnId={columnId}
        />
      )}
    </div>
  );
}
