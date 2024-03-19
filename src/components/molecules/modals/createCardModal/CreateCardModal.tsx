import { Card, Column, Member } from '@/@types/type';
import { getMember } from '@/api/members/memberApi';
import Button from '@/components/atoms/buttons/button';
import CreateDoItYourselfDate from '@/components/atoms/input/dateInput/CreateDoItYourselfDate';
import CreateDoItYourselfDescription from '@/components/atoms/input/descriptionInput/CreateDoItYourselfDescription';
import CreateDoItYourselfTitle from '@/components/atoms/input/titleInput/CreateDoItYourselfTitle';
import { useEffect, useRef, useState } from 'react';
import ImageInput from '../../imageInput/ImageInput';
import CreateDoItYourselfTag from '../../input/CreateDoItYourselfTag';
import ManagerDropDown from '../../managerDropDown/ManagerDropDown';
import styles from './createCardModal.module.scss';
import { uploadCardImage } from '@/api/columns/columnApi';
import { createCard } from '@/api/cards/cardApi';
import { useForm } from 'react-hook-form';

interface ModalProps {
  column: Column;
  onClose: () => void;
}

export default function CreateCardModal({ column, onClose }: ModalProps) {
  const image = useRef<File>();
  const [members, setMembers] = useState<Member[]>([]); // 멤버 상태 추가
  const { getValues, handleSubmit, register, setValue } = useForm<Card>({
    defaultValues: {
      columnId: column.id,
      dashboardId: column.dashboardId,
    },
    mode: 'all',
  });

  useEffect(() => {
    async function fetchMembers() {
      try {
        const memberData = await getMember(); // 멤버 목록 가져오기
        setMembers([memberData]); // Fix: Pass memberData as an array
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    }

    fetchMembers();
  }, []); // 컴포넌트가 마운트될 때만 실행

  const onSubmit = async () => {
    try {
      const card = getValues() as Card;
      if (image.current) {
        const { imageUrl } = await uploadCardImage(column.id, image.current);
        card.imageUrl = imageUrl;
      }
      await createCard(card);
      onClose();
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className={styles.cardDetailModal}>
      <form className={styles.modalContent} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={styles.modalTitle}>할 일 생성</h1>
        <ManagerDropDown members={members} />
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
          />
        </div>
      </form>
    </div>
  );
}
