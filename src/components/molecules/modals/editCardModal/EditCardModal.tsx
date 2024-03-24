import { CardDetail } from '@/@types/type';
import Button from '@/components/atoms/buttons/button';
import CreateDoItYourselfDate from '@/components/atoms/input/dateInput/CreateDoItYourselfDate';
import CreateDoItYourselfDescription from '@/components/atoms/input/descriptionInput/CreateDoItYourselfDescription';
import CreateDoItYourselfTitle from '@/components/atoms/input/titleInput/CreateDoItYourselfTitle';
import { register } from 'module';
import React, { useState } from 'react';
import ImageInput from '../../imageInput/ImageInput';
import CreateDoItYourselfTag from '../../input/CreateDoItYourselfTag';
import ManagerDropDown from '../../managerDropDown/ManagerDropDown';
import styles from './editCardModal.module.scss';

interface ModalProps {
  onClose: () => void;
  cardData: CardDetail;
  // selectedManager: MemberProfile | null;
}

export default function EditCardModal({ onClose, cardData }: ModalProps) {
  const [title, setTitle] = useState(cardData.title);
  const [description, setDescription] = useState(cardData.description);
  const [dueDate, setDueDate] = useState(cardData.dueDate);
  const [tags, setTags] = useState(cardData.tags);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const handleModalClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    event.stopPropagation();
  };
  console.log({ cardData });

  return (
    <div className={styles['cardDetailModal']} onClick={handleModalClick}>
      <div className={styles['modalContent']}>
        <h1 className={styles['modalTitle']}>할 일 수정</h1>
        {/* <StatusDropDown></StatusDropDown> */}
        <ManagerDropDown defaultValue={cardData.assignee} />
        <CreateDoItYourselfTitle value={title} onChange={handleTitleChange} />
        <CreateDoItYourselfDescription value={description} />
        <CreateDoItYourselfDate defaultValue={dueDate} />
        <CreateDoItYourselfTag
          defaultTags={tags}
          onChangeTags={(tags) => setTags(tags)}
        />
        <div>
          <h2>이미지</h2>
          <ImageInput size="big" />
        </div>
        <div className={styles['buttonArea']}>
          <Button name="취소" type="modal" color="white" onClick={onClose} />
          <Button name="수정" type="modal" color="blue" />
        </div>
      </div>
    </div>
  );
}
