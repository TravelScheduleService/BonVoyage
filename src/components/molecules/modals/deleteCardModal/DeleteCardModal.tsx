import React, { useState } from 'react';
import styles from './deleteCardModal.module.scss';
import Button from '@/components/atoms/buttons/button';
import instance from '@/api/axios';

interface ModalProps {
  onClose: () => void;
  getCards: () => void;
  cardId?: number;
}

export default function DeleteCardModal({
  onClose,
  getCards,
  cardId,
}: ModalProps) {
  const handleDeleteCard = async () => {
    try {
      await instance.delete(`/cards/${cardId}`);
      getCards();
      onClose();
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  };

  const handleModalClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    event.stopPropagation();
  };

  return (
    <div className={styles['cardDetailModal']} onClick={handleModalClick}>
      <div className={styles['modalContent']}>
        <h1 className={styles['modalTitle']}>여행 계획을 삭제합니다.</h1>

        <div className={styles['buttonArea']}>
          <Button name="취소" type="modal" color="white" onClick={onClose} />
          <Button
            name="삭제"
            type="modal"
            color="blue"
            onClick={handleDeleteCard}
          />
        </div>
      </div>
    </div>
  );
}
