import React, { useState } from 'react';
import styles from './editColumnModal.module.scss';
import Button from '@/components/atoms/buttons/button';
import ColumnNameInput from '@/components/atoms/input/columnNameInput/ColumnNameInput';
import DeleteColumnModal from '../deleteColumnModal/DeleteColumnModal';
import instance from '@/api/axios';

interface ModalProps {
  onClose: () => void;
  getColumns: () => void;
  columnName: string;
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
      // 수정된 컬럼 이름을 서버에 보냅니다.
      await instance.put(`/columns/${columnId}`, { title: editedColumnName });
      // 성공적으로 서버에 보냈을 경우 모달을 닫습니다.
      getColumns();
      onClose();
    } catch (error) {
      console.error('Error updating column:', error);
      // 실패한 경우에 대한 처리를 여기에 추가할 수 있습니다.
    }
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
          <Button
            name="변경"
            type="modal"
            color="blue"
            onClick={handleEditClick}
          />
        </div>
      </div>
      {isModalOpen && (
        <DeleteColumnModal onClose={closeModal}></DeleteColumnModal>
      )}
    </div>
  );
}
