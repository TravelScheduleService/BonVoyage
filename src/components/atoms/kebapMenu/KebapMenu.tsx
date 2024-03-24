import { CardDetail } from '@/@types/type';
import DeleteCardModal from '@/components/molecules/modals/deleteCardModal/DeleteCardModal';
import EditCardModal from '@/components/molecules/modals/editCardModal/EditCardModal';
import { useState } from 'react';
import styles from './kebapMenu.module.scss';

interface ModalProps {
  getCards: () => void;
  cardId?: number;
  cardData: CardDetail;
}

const KebapMenu = ({ cardId, getCards, cardData }: ModalProps) => {
  const [showEditCardModal, setShowEditCardModal] = useState(false);
  const [showDeleteCardModal, setShowDeleteCardModal] = useState(false);

  const handleEditButton = () => {
    setShowEditCardModal(true);
  };
  const handleDeleteButton = () => {
    setShowDeleteCardModal(true);
  };
  const closeModal = () => {
    setShowEditCardModal(false);
    setShowDeleteCardModal(false);
  };

  return (
    <div className={styles['dropdown']}>
      <div
        className={styles['dropdownMenu']}
        onClick={(e) => {
          e.stopPropagation();
          handleEditButton();
        }}
      >
        수정하기
      </div>
      <div
        className={styles['dropdownMenu']}
        onClick={(e) => {
          e.stopPropagation();
          handleDeleteButton();
        }}
      >
        삭제하기
      </div>
      {showEditCardModal && (
        <EditCardModal onClose={closeModal} cardData={cardData} />
      )}
      {showDeleteCardModal && (
        <DeleteCardModal
          onClose={closeModal}
          cardId={cardId}
          getCards={getCards}
        ></DeleteCardModal>
      )}
    </div>
  );
};
export default KebapMenu;
