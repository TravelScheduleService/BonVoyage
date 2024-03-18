import React, { useState } from 'react';
import styles from './editColumnModal.module.scss';
import Button from '@/components/atoms/buttons/button';
import ColumnNameInput from '@/components/atoms/input/columnNameInput/ColumnNameInput';
import DeleteColumnModal from '../deleteColumnModal/DeleteColumnModal';

interface ModalProps {
  onClose: () => void;
  columnName: string;
}

export default function EditColumnModal({ onClose, columnName }: ModalProps) {
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

  return (
    <div className={styles['cardDetailModal']}>
      <div className={styles['modalContent']}>
        <h1 className={styles['modalTitle']}>컬럼 관리</h1>
        <ColumnNameInput
          value={editedColumnName}
          onChange={handleInputChange}
        ></ColumnNameInput>
        <span className={styles['deleteButton']} onClick={handleDeleteClick}>
          삭제하기
        </span>

        <div className={styles['buttonArea']}>
          <Button
            name="취소"
            type="modal"
            color="white"
            onClick={onClose}
          ></Button>
          <Button name="변경" type="modal" color="blue" />
        </div>
      </div>
      {isModalOpen && (
        <DeleteColumnModal onClose={closeModal}></DeleteColumnModal>
      )}
    </div>
  );
}
