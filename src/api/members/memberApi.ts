import { ID, Member } from '@/@types/type';
import { getErrorMessage } from '..';
import instance from '../axios';

interface MemberList {
  members: Member[];
}

// 대시보드 멤버 목록 조회
export const getMemberList = async (dashboardId: ID) => {
  try {
    const res = await instance.get<MemberList>(
      `members?page=1&size=20&dashboardId=${dashboardId}`,
    );
    return res.data;
  } catch (error) {
    console.error('getMember:', error);
    throw error;
  }
};

// 대시보드 멤버 삭제
export const deleteMember = async (memberId: number) => {
  try {
    const res = await instance.delete<Member>(`/members/${memberId}`);
  } catch (error) {
    console.error('deleteMember:', getErrorMessage(error));
  }
};

//초대목록 불러오기
export async function getInvitedMemberList(dashboardId: ID) {
  try {
    const res = await instance.get(`dashboards/${dashboardId}/invitations`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
      },
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
}

// 초대 취소
export const deleteInvitation = async (
  dashboardId: ID,
  invitationId: number,
) => {
  try {
    await instance.delete<Member>(
      `/dashboards/${dashboardId}/invitations/${invitationId}`,
    );
  } catch (error) {
    console.error('deleteInvitation:', getErrorMessage(error));
  }
};
