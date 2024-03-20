import { CreateDashboard } from '@/@types/type';
import instance from '../axios';

export async function getMyDashboardList(dashboardListPage: number, size = 5) {
  try {
    const { data } = await instance.get('/dashboards', {
      params: {
        navigationMethod: 'pagination',
        page: dashboardListPage,
        size: size,
      },
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
      },
    });

    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getInvitedDashboardList(params: {
  size: number;
  cursorId?: number;
}) {
  try {
    const { data } = await instance.get('/invitations', {
      params,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
      },
    });

    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function postNewDashboard(createDashboard: CreateDashboard) {
  try {
    const { data } = await instance.post(
      'dashboards',
      { ...createDashboard },
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
        },
      },
    );

    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function putInviteAnswer(id: number, answer: boolean) {
  const response = await instance.put(
    `/invitations/${id}`,
    {
      inviteAccepted: answer,
    },
    {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
      },
    },
  );
}
