import { ID } from '@/@types/type';
import {
  deleteInvitation,
  getInvitedMemberList,
} from '@/api/members/memberApi';
import Button from '@/components/atoms/buttons/button';
import HeaderBtn from '@/components/atoms/buttons/headerBtn';
import PagenationBtn from '@/components/atoms/buttons/pagenationBtn';
import { useEffect, useState } from 'react';
import InviteMemberModal from '../modals/inviteMemberModal/InviteMemberModal';
import styles from './inviteList.module.scss';

type Member = {
  email: string;
  id: number;
};

type Props = {
  dashboardId: ID;
};

export default function InviteList({ dashboardId }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    async function fetchMembers() {
      try {
        const memberData = await getInvitedMemberList(dashboardId);
        setMembers(memberData.invitations);
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    }
    fetchMembers();
  }, [dashboardId]);

  async function onClickDelete(dashboardId: ID, invitationId: number) {
    try {
      await deleteInvitation(dashboardId, invitationId);
      window.location.reload();
    } catch (error) {
      console.error('delete error:', error);
    }
  }

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onClickInviteBtn = () => {
    setIsModalOpen(true);
  };

  return (
    <div className={styles['container']}>
      <div className={styles['top']}>
        <span>초대 내역</span>
        <div className={styles['pagenation']}>
          <span>1 페이지 중 1</span>
          <PagenationBtn />
          <HeaderBtn
            name="초대하기"
            type="invite"
            color="blue"
            onClick={onClickInviteBtn}
          />
        </div>
      </div>
      <div className={styles['membersContainer']}>
        <span>이메일</span>
        {members?.map((member) => (
          <div key={member.id} className={styles['member']}>
            <span>{member.invitee.email}</span>
            <Button
              type="modal"
              name="취소"
              onClick={() => onClickDelete(dashboardId, member.id)}
            />
          </div>
        ))}
      </div>
      {isModalOpen && <InviteMemberModal onClose={closeModal} />}
    </div>
  );
}
