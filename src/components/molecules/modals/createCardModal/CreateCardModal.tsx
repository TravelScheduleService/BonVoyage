import { Member } from '@/@types/type';
import { getMember } from '@/api/members/memberApi';
import Button from '@/components/atoms/buttons/button';
import CreateDoItYourselfDate from '@/components/atoms/input/dateInput/CreateDoItYourselfDate';
import CreateDoItYourselfDescription from '@/components/atoms/input/descriptionInput/CreateDoItYourselfDescription';
import CreateDoItYourselfTitle from '@/components/atoms/input/titleInput/CreateDoItYourselfTitle';
import { useEffect, useState } from 'react';
import ImageInput from '../../imageInput/ImageInput';
import CreateDoItYourselfTag from '../../input/CreateDoItYourselfTag';
import ManagerDropDown from '../../managerDropDown/ManagerDropDown';
import styles from './createCardModal.module.scss';

interface ModalProps {
  onClose: () => void;
}

export default function CreateCardModal({ onClose }: ModalProps) {
  const [members, setMembers] = useState<Member[]>([]); // 멤버 상태 추가

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

  const handleImageSelected = (imageUrl: string) => {
    // 선택된 이미지 URL을 처리하는 로직을 작성합니다.
    console.log('Selected image URL:', imageUrl);
  };

  return (
    <div className={styles.cardDetailModal}>
      <div className={styles.modalContent}>
        <h1 className={styles.modalTitle}>할 일 생성</h1>
        <ManagerDropDown members={members} />
        <CreateDoItYourselfTitle />
        <CreateDoItYourselfDescription />
        <CreateDoItYourselfDate />
        <CreateDoItYourselfTag />
        <div>
          <h2>이미지</h2>
          <ImageInput onImageSelected={handleImageSelected} size="big" />
        </div>
        <div className={styles.buttonArea}>
          <Button name="취소" type="modal" color="white" onClick={onClose} />
          <Button name="생성" type="modal" color="blue" />
        </div>
      </div>
    </div>
  );
}
