import React, { useState } from 'react';
import styles from './createColumnModal.module.scss';
import Button from '@/components/atoms/buttons/button';
import ColumnNameInput from '@/components/atoms/input/columnNameInput/ColumnNameInput';
import instance from '@/api/axios';
import { useDashboardState } from '@/hooks/contexts';

interface ModalProps {
  onClose: () => void;
  getColumns: () => void;
}

export default function CreateColumnModal({ onClose, getColumns }: ModalProps) {
  const [dashboard] = useDashboardState();
  const [columnName, setColumnName] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColumnName(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const columnData = {
        title: columnName,
        dashboardId: dashboard?.id,
      };
      const res = await instance.post('/columns', columnData, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
        },
      });
      console.log('Column added successfully:', res.data);
      onClose();
      getColumns();
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
          <Button name="취소" type="modal" color="white" onClick={onClose} />
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
