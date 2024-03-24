import React, { useState } from 'react';
import styles from './deleteColumnModal.module.scss';
import Button from '@/components/atoms/buttons/button';
import instance from '@/api/axios';

interface ModalProps {
  onClose: () => void;
  getColumns: () => void;
  columnId: number;
}

export default function DeleteColumnModal({
  onClose,
  getColumns,
  columnId,
}: ModalProps) {
  const handleDeleteColumn = async () => {
    try {
      await instance.delete(`/columns/${columnId}`);
      getColumns();
      onClose();
    } catch (error) {
      console.error('Error deleting column:', error);
    }
  };

  return (
    <div className={styles['cardDetailModal']}>
      <div className={styles['modalContent']}>
        <h1 className={styles['modalTitle']}>컬럼의 모든 카드가 삭제됩니다.</h1>

        <div className={styles['buttonArea']}>
          <Button name="취소" type="modal" color="white" onClick={onClose} />
          <Button
            name="삭제"
            type="modal"
            color="blue"
            onClick={handleDeleteColumn}
          />
        </div>
      </div>
    </div>
  );
}
