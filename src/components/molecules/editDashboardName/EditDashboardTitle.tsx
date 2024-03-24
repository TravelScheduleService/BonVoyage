import { Dashboard, ID } from '@/@types/type';
import axios from '@/api/axios';
import { changeDashboardInfo } from '@/api/dashboardInfoApi/dashboardInfoApi';
import Button from '@/components/atoms/buttons/button';
import { COLOR_LIST, COLOR_NAMES } from '@/styles/colorList';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ColorPalette from '../colorPalette/ColorPalette';
import styles from './editDashboardTitle.module.scss';

export default function EditDashboardTitle() {
  const router = useRouter();
  const { id } = router.query as { id: ID };

  const [dashboardInfo, setDashboardInfo] = useState<Dashboard>({
    id: 0,
    title: '',
    color: '',
    createdAt: '',
    updatedAt: '',
    createdByMe: true,
    userId: 0,
  });

  const [inputTitle, setInputTitle] = useState('');

  const onClickPaletteColor = (color: string) => {
    setDashboardInfo((prevData) => ({
      ...prevData,

      color: COLOR_LIST[color],
    }));
  };

  async function getDashboard(targetId: ID) {
    const res = await axios.get(`/dashboards/${targetId}`);
    const nextDashboard = res.data;
    setDashboardInfo(nextDashboard);
  }

  useEffect(() => {
    if (!id) return;
    getDashboard(id);
  }, [id]);

  if (!dashboardInfo) return null;

  const onSubmit = async () => {
    try {
      await changeDashboardInfo(
        {
          title: inputTitle,
          color: dashboardInfo.color,
        },
        id,
      );
      window.location.reload();
    } catch (error) {
      console.error('대시보드 정보 수정 실패:', error);
    }
  };

  return (
    <div className={styles['container']}>
      <div className={styles['titleAndColor']}>
        <span>{dashboardInfo.title}</span>
        <ColorPalette
          colorList={COLOR_LIST}
          colorNameList={COLOR_NAMES}
          onClickPaletteColor={onClickPaletteColor}
        />
      </div>
      <div className={styles['changeTitle']}>
        <span>대시보드 이름</span>
        <input
          placeholder="대시보드"
          value={inputTitle}
          onChange={(e) => setInputTitle(e.target.value)}
        />
        <Button name="변경" type="modal" color="blue" onClick={onSubmit} />
      </div>
    </div>
  );
}
