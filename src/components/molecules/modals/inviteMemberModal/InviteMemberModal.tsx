import React, { useState } from 'react';
import styles from './inviteMemberModal.module.scss';

import { ID } from '@/@types/type';
import instance from '@/api/axios';
import Button from '@/components/atoms/buttons/button';
import InviteInput from '@/components/atoms/input/inviteInput/inviteInput';
import { useRouter } from 'next/router';

interface ModalProps {
  onClose: () => void;
  refreshMember?: () => void;
}

export default function InviteMemberModal({
  onClose,
  refreshMember,
}: ModalProps) {
  const [email, setEmail] = useState('');
  const router = useRouter();
  const { id } = router.query as { id: ID };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const inviteData = {
        email: email,
      };
      const res = await instance.post(
        `/dashboards/${id}/invitations`,
        inviteData,
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
          },
        },
      );
      console.log('invite successfully:', res.data);
      onClose();
      if (refreshMember) {
        refreshMember();
      }

      return res.data;
    } catch (error) {
      console.error('초대 오류:', error);
    }
  };

  return (
    <div className={styles['cardDetailModal']}>
      <div className={styles['modalContent']}>
        <h1 className={styles['modalTitle']}>초대하기</h1>
        <InviteInput value={email} onChange={handleInputChange} />

        <div className={styles['buttonArea']}>
          <Button name="취소" type="modal" color="white" onClick={onClose} />
          <Button
            name="초대"
            type="modal"
            color="blue"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}
