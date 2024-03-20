import BaseModal from '@/components/atoms/baseModal/BaseModal';
import styles from './createDashboardModal.module.scss';
import classNames from 'classnames/bind';
import { ChangeEvent, useState } from 'react';
import CheckIcon from '@/components/icon/CheckIcon';
import { CreateDashboard } from '@/@types/type';
import ColorPalette from '../colorPalette/ColorPalette';

const cn = classNames.bind(styles);

const COLOR_LIST: { [value: string]: string } = {
  green: '#7AC555',
  orange: '#FFA500',
  pink: '#E876EA',
  purple: '#760DDE',
  blue: '#76A5EA',
};

const COLOR_NAMES = ['green', 'purple', 'orange', 'pink', 'blue'];

interface Props {
  onClickAccept: (value: CreateDashboard) => void;
  onClickCloseModal: () => void;
}

export default function CreateDashboardModal({
  onClickAccept,
  onClickCloseModal,
}: Props) {
  const [createDashboard, setCreateDashboard] = useState({
    title: '',
    color: '#7AC555',
  });

  const onClickCreateDashboard = () => {
    onClickAccept(createDashboard);
  };

  const onChangeCreateDashboardTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setCreateDashboard((preData) => ({
      ...preData,
      title: e.target.value,
    }));
  };

  const onClickPaletteColor = (color: string) => {
    setCreateDashboard((preData) => ({
      ...preData,
      color: COLOR_LIST[color],
    }));
  };

  return (
    <BaseModal closeModal={onClickCloseModal}>
      <div className={cn('modalContent')}>
        <span className={cn('modalName')}>새로운 대시보드</span>
        <div className={cn('dashboardName')}>
          <label>대시보드 이름</label>
          <input type="text" onChange={onChangeCreateDashboardTitle} />
        </div>
        <ColorPalette
          colorList={COLOR_LIST}
          colorNameList={COLOR_NAMES}
          onClickPaletteColor={onClickPaletteColor}
        />
        <div className={cn('modalButtons')}>
          <button className={cn('modalCancel')} onClick={onClickCloseModal}>
            취소
          </button>
          <button
            className={cn('modalCreate')}
            onClick={onClickCreateDashboard}
          >
            생성
          </button>
        </div>
      </div>
    </BaseModal>
  );
}
