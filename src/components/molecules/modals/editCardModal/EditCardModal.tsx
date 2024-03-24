import { Card, CardDetail } from '@/@types/type';
import { updateCard } from '@/api/cards/cardApi';
import Button from '@/components/atoms/buttons/button';
import CreateDoItYourselfDate from '@/components/atoms/input/dateInput/CreateDoItYourselfDate';
import CreateDoItYourselfDescription from '@/components/atoms/input/descriptionInput/CreateDoItYourselfDescription';
import CreateDoItYourselfTitle from '@/components/atoms/input/titleInput/CreateDoItYourselfTitle';
import React from 'react';
import { useForm } from 'react-hook-form';
import ImageInput from '../../imageInput/ImageInput';
import CreateDoItYourselfTag from '../../input/CreateDoItYourselfTag';
import ManagerDropDown from '../../managerDropDown/ManagerDropDown';
import StatusDropDown from '../../statusDropDown/StatusDropDown';
import styles from './editCardModal.module.scss';

interface ModalProps {
  onClose: () => void;
  cardData: CardDetail;
  // selectedManager: MemberProfile | null;
}

export default function EditCardModal({
  onClose,
  cardData,
  columns,
  columnTitle,
}: ModalProps) {
  const { handleSubmit, register, setValue } = useForm<Card>({
    defaultValues: cardData,
    mode: 'all',
  });
  const handleModalClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    event.stopPropagation();
  };

  const onSubmit = async (card: Card) => {
    try {
      await updateCard(card);
      onClose();
      window.location.reload();
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className={styles['cardDetailModal']} onClick={handleModalClick}>
      <form
        className={styles['modalContent']}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className={styles['modalTitle']}>여행 계획 수정</h1>
        <StatusDropDown items={columns} columnTitle={columnTitle} />
        <ManagerDropDown
          defaultValue={cardData.assignee}
          onChange={(assignee) => setValue('assigneeUserId', assignee.userId)}
        />
        <CreateDoItYourselfTitle {...register('title')} />
        <CreateDoItYourselfDescription {...register('description')} />
        <CreateDoItYourselfDate
          defaultValue={cardData.dueDate}
          {...register('dueDate')}
        />
        <CreateDoItYourselfTag
          defaultTags={cardData.tags}
          onChangeTags={(tags) => setValue('tags', tags)}
        />
        <div>
          <h2>이미지</h2>
          <ImageInput size="big" />
        </div>
        <div className={styles['buttonArea']}>
          <Button name="취소" type="modal" color="white" onClick={onClose} />
          <Button
            name="수정"
            type="modal"
            color="blue"
            buttonProps={{ type: 'submit' }}
          />
        </div>
      </form>
    </div>
  );
}
