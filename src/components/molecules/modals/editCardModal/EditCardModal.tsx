import React from 'react';
import styles from './editCardModal.module.scss';
import CreateDoItYourselfTitle from '@/components/atoms/input/titleInput/CreateDoItYourselfTitle';
import CreateDoItYourselfDescription from '@/components/atoms/input/descriptionInput/CreateDoItYourselfDescription';
import CreateDoItYourselfDate from '@/components/atoms/input/dateInput/CreateDoItYourselfDate';
import CreateDoItYourselfTag from '../../input/CreateDoItYourselfTag';
import ManagerDropDown from '../../managerDropDown/ManagerDropDown';
import ImageInput from '../../imageInput/ImageInput';
import Button from '@/components/atoms/buttons/button';
import StatusDropDown from '../../statusDropDown/StatusDropDown';

interface ModalProps {
  onClose: () => void;
}

export default function EditCardModal({ onClose }: ModalProps) {
  return (
    <div className={styles['cardDetailModal']}>
      <div className={styles['modalContent']}>
        <h1 className={styles['modalTitle']}>할 일 수정</h1>
        {/* <StatusDropDown></StatusDropDown> */}
        <ManagerDropDown></ManagerDropDown>
        <CreateDoItYourselfTitle></CreateDoItYourselfTitle>
        <CreateDoItYourselfDescription></CreateDoItYourselfDescription>
        <CreateDoItYourselfDate></CreateDoItYourselfDate>
        <CreateDoItYourselfTag></CreateDoItYourselfTag>
        <div>
          <h2>이미지</h2>
          <ImageInput size="big"></ImageInput>
        </div>
        <div className={styles['buttonArea']}>
          <Button
            name="취소"
            type="modal"
            color="white"
            onClick={onClose}
          ></Button>
          <Button name="생성" type="modal" color="blue" />
        </div>
      </div>
    </div>
  );
}
