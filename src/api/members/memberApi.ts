import { Member } from '@/@types/type';
import axios from 'axios';

// 대시보드 멤버 목록 조회
export const getMember = async () => {
  try {
    const res = await axios.get<Member>('members');
    return res.data;
  } catch (error) {
    console.error('getMember:', error);
    throw error;
  }
};

// 대시보드 멤버 삭제
export const deleteMember = async (memberId: Member) => {
  try {
    const res = await axios.delete<Member>(`members/${memberId}`);
    return res.data;
  } catch (error) {
    console.error('deleteMember:', error);
    throw error;
  }
};
