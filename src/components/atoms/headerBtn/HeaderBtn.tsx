import styles from './headerBtn.module.scss';
import { ButtonProps } from '@/@types/type';

const HeaderBtn = ({ name, type, onClick }: ButtonProps) => {
  const editImg = '/assets/icon/settingsIcon.svg';
  const addBoxImg = '/assets/icon/addBoxIcon.svg';

  //이미지 컴포넌트를 사용하면 display:none이 적용이 안돼서 img태그로 대체

  const classNamas = (type: ButtonProps['type']) => {
    switch (type) {
      case 'edit':
        return styles.edit;
      case 'invite':
        return styles.invite;
      default:
        return '';
    }
  };

  return (
    <button className={classNamas(type)} onClick={onClick}>
      {type === 'edit' ? (
        <img src={editImg} alt="settings" className={styles.editImg} />
      ) : (
        <img src={addBoxImg} alt="addBox" className={styles.addBoxImg} />
      )}
      {name}
    </button>
  );
};

export default HeaderBtn;
