import { ID, Member } from '@/@types/type';
import { deleteMember, getMemberList } from '@/api/members/memberApi';
import Button from '@/components/atoms/buttons/button';
import PagenationBtn from '@/components/atoms/buttons/pagenationBtn';
import ProfileIcon from '@/components/atoms/profileIcon/ProfileIcon';
import { useEffect, useState } from 'react';
import styles from './members.module.scss';

type Props = {
  dashboardId: ID;
};

export default function Members({ dashboardId }: Props) {
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    async function fetchMembers() {
      try {
        const memberData = await getMemberList(dashboardId);
        setMembers(memberData.members);
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    }

    fetchMembers();
  }, [dashboardId]);

  async function onClickDelete(id: number) {
    try {
      await deleteMember(id);
    } catch (error) {
      console.error('delete error:', error);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <span>구성원</span>
        <div className={styles.pagenation}>
          <span>1 페이지 중 1</span>
          <PagenationBtn />
        </div>
      </div>
      <div className={styles.membersContainer}>
        <span>이름</span>
        {members.map((member) => (
          <div key={member.id} className={styles.member}>
            <div>
              <ProfileIcon name={member.nickname} />
              <span>{member.nickname}</span>
            </div>
            <Button
              type="delete"
              name="삭제"
              onClick={() => onClickDelete(member.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
