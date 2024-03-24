import { Card, Column } from '@/@types/type';
import { createCard } from '@/api/cards/cardApi';
import { uploadCardImage } from '@/api/columns/columnApi';
import Button from '@/components/atoms/buttons/button';
import CreateDoItYourselfDate from '@/components/atoms/input/dateInput/CreateDoItYourselfDate';
import CreateDoItYourselfDescription from '@/components/atoms/input/descriptionInput/CreateDoItYourselfDescription';
import CreateDoItYourselfTitle from '@/components/atoms/input/titleInput/CreateDoItYourselfTitle';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import ImageInput from '../../imageInput/ImageInput';
import CreateDoItYourselfTag from '../../input/CreateDoItYourselfTag';
import ManagerDropDown from '../../managerDropDown/ManagerDropDown';
import styles from './createCardModal.module.scss';

interface ModalProps {
  column: Column;
  onClose: () => void;
}

export default function CreateCardModal({ column, onClose }: ModalProps) {
  const image = useRef<File>();
  const { getValues, handleSubmit, register, setValue } = useForm<Card>({
    defaultValues: {
      columnId: column.id,
      dashboardId: column.dashboardId,
    },
    mode: 'all',
  });

  const onSubmit = async () => {
    try {
      const card = getValues() as Card;
      if (image.current) {
        const { imageUrl } = await uploadCardImage(column.id, image.current);
        card.imageUrl = imageUrl;
      }
      await createCard(card);
      onClose();
      window.location.reload();
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className={styles.cardDetailModal}>
      <form className={styles.modalContent} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={styles.modalTitle}>할 일 생성</h1>
        <ManagerDropDown
          onChange={(assignee) => setValue('assigneeUserId', assignee.id)}
        />
        <CreateDoItYourselfTitle
          {...register('title', {
            required: '제목을 입력해주세요.',
          })}
        />
        <CreateDoItYourselfDescription
          {...register('description', {
            required: '설명을 입력해주세요.',
          })}
        />
        <CreateDoItYourselfDate {...register('dueDate', {})} />
        <CreateDoItYourselfTag
          onChangeTags={(tags) => setValue('tags', tags)} //setCard((card) => (card.tags = tags))}
        />
        <div>
          <h2>이미지</h2>
          <ImageInput imageRef={image} />
        </div>
        <div className={styles.buttonArea}>
          <Button name="취소" type="modal" color="white" onClick={onClose} />
          <Button
            name="생성"
            type="modal"
            color="blue"
            buttonProps={{ type: 'submit' }}
            onClick={onSubmit}
          />
        </div>
      </form>
    </div>
  );
}
