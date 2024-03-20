import PagenationBtn from '@/components/atoms/buttons/pagenationBtn';
import styles from './inviteList.module.scss';
import Button from '@/components/atoms/buttons/button';
import HeaderBtn from '@/components/atoms/buttons/headerBtn';

type Member = {
  email: string;
  id: number;
};

type Props = {
  members: Member[];
};

export default function InviteList({
  members = [
    { email: 'codeitA@codeit.com', id: 0 },
    { email: 'codeitB@codeit.com', id: 1 },
  ],
}: Props) {
  return (
    <div className={styles['container']}>
      <div className={styles['top']}>
        <span>초대 내역</span>
        <div className={styles['pagenation']}>
          <span>1 페이지 중 1</span>
          <PagenationBtn />
          <HeaderBtn name="초대하기" type="invite" color="blue" />
        </div>
      </div>
      <div className={styles['membersContainer']}>
        <span>이메일</span>
        {members.map((member) => (
          <div key={member.id} className={styles['member']}>
            <span>{member.email}</span>
            <Button type="modal" name="취소" />
          </div>
        ))}
      </div>
    </div>
  );
}
