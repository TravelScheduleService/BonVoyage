import Link from 'next/link';
import styles from './editDashboardTitle.module.scss';
import Button from '@/components/atoms/buttons/button';
import ColorPalette from '../colorPalette/ColorPalette';
import { useEffect, useState } from 'react';
import { COLOR_LIST, COLOR_NAMES } from '@/styles/colorList';
import axios from '@/api/axios';
import { useRouter } from 'next/router';

export default function EditDashboardTitle() {
  const router = useRouter();
  const { id } = router.query;

  const [dashboardInfo, setDashboardInfo] = useState();

  const onClickPaletteColor = (color: string) => {
    setDashboardInfo((preData) => ({
      ...preData,
      color: COLOR_LIST[color],
    }));
  };

  async function getDashboard(targetId: string) {
    const res = await axios.get(`/dashboards/${targetId}`);
    const nextDashboard = res.data;
    setDashboardInfo(nextDashboard);
  }

  useEffect(() => {
    if (!id) return;
    getDashboard(id);
  }, [id]);

  if (!dashboardInfo) return null;

  return (
    <div className={styles['container']}>
      <div className={styles['titleAndColor']}>
        <span>{dashboardInfo.title}</span>
        <ColorPalette
          colorList={COLOR_LIST}
          colorNameList={COLOR_NAMES}
          // onClickPaletteColor={onClickPaletteColor}
        />
      </div>
      <div className={styles['changeTitle']}>
        <span>대시보드 이름</span>
        <input placeholder="뉴프로젝트" />
        <Button name="변경" type="modal" color="blue" />
      </div>
    </div>
  );
}
