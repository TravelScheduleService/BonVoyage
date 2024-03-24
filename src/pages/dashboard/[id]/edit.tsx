import { ID } from '@/@types/type';
import { deleteDashboard } from '@/api/dashboardInfoApi/dashboardInfoApi';
import EventDashboardBtn from '@/components/atoms/buttons/eventDashboardBtn';
import SideBar from '@/components/atoms/sideBar/SideBar';
import EditDashboardTitle from '@/components/molecules/editDashboardName/EditDashboardTitle';
import HeaderMyDashboard from '@/components/molecules/header/headerMyDashboard/HeaderMyDashboard';
import InviteList from '@/components/molecules/inviteList/InviteList';
import Members from '@/components/molecules/members/Members';
import styles from '@/styles/editDashboard.module.scss';
import Image from 'next/image';
import { useRouter } from 'next/router';
import leftArrowIcon from '/public/assets/icon/leftArrowIcon.svg';

export default function EditDashboard() {
  const router = useRouter();
  const { id } = router.query as { id: ID };
  const goBack = () => {
    router.back();
  };

  async function onClickDeleteDashboard(id: ID) {
    try {
      const dashboard = await deleteDashboard(id);
      router.push('/mydashboard');
    } catch (error) {
      console.error('Error delete dashboard:', error);
    }
  }

  return (
    <div className={styles['background']}>
      <HeaderMyDashboard isDashboard={true} />
      <SideBar />
      <div className={styles['components']}>
        <button className={styles.return} onClick={goBack}>
          <Image src={leftArrowIcon} alt="돌아가기" width={20} height={20} />
          돌아가기
        </button>
        <EditDashboardTitle />
        <Members dashboardId={id} />
        <InviteList dashboardId={id} />
        <EventDashboardBtn
          name="대시보드 삭제하기"
          type="deleteDashboard"
          onClick={() => onClickDeleteDashboard(id)}
        />
      </div>
    </div>
  );
}
