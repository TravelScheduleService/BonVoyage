import EditCardModal from '@/components/molecules/modals/editCardModal/EditCardModal';
import { useState } from 'react';
import styles from './kebapMenu.module.scss';

const KebapMenu = () => {
  const [showEditCardModal, setShowEditCardModal] = useState(false);

  const handleEditButton = () => {
    setShowEditCardModal(!showEditCardModal);
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
      <div className={styles['dropdownMenu']}>삭제하기</div>
      {showEditCardModal && (
        <EditCardModal onClose={handleEditButton}></EditCardModal>
      )}
    </div>
  );
};
export default KebapMenu;
