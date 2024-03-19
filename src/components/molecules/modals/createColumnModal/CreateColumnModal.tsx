import React, { useState } from 'react';
import styles from './createColumnModal.module.scss';

import Button from '@/components/atoms/buttons/button';
import ColumnNameInput from '@/components/atoms/input/columnNameInput/ColumnNameInput';
import instance from '@/api/axios';

interface ModalProps {
  onClose: () => void;
  dashboardId: number;
  setColumns: React.Dispatch<React.SetStateAction<any[]>>;
}

export default function CreateColumnModal({
  onClose,
  dashboardId,
  setColumns,
}: ModalProps) {
  const [columnName, setColumnName] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColumnName(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const columnData = {
        title: columnName,
        dashboardId: dashboardId,
      };
      const res = await instance.post('/columns', columnData, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      console.log('Column added successfully:', res.data);
      onClose();
      window.location.reload();
    } catch (error) {
      console.error('Error adding column:', error);
    }
  };

  return (
    <div className={styles['cardDetailModal']}>
      <div className={styles['modalContent']}>
        <h1 className={styles['modalTitle']}>새 컬럼 생성</h1>
        <ColumnNameInput value={columnName} onChange={handleInputChange} />

        <div className={styles['buttonArea']}>
          <Button
            name="취소"
            type="modal"
            color="white"
            onClick={onClose}
          ></Button>
          <Button
            name="생성"
            type="modal"
            color="blue"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}
