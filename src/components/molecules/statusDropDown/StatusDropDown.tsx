import classNames from 'classnames/bind';
import Image from 'next/image';
import { useState } from 'react';
import ChipProgress from '../chipProgress/ChipProgress';
import styles from './statusDropDown.module.scss';

const cn = classNames.bind(styles);

interface Props {
  items: Item[];
  title: string;
  columnTitle: string;
}

interface Item {
  id: number;
  title: string;
}

export default function StatusDropDown({ items, title, columnTitle }: Props) {
  const [nowItem, setNowItem] = useState([columnTitle]);
  const [itemList] = useState(items);
  const [isOpenItemList, setIsOpenItemList] = useState(false);

  const onClickItem = (element: string) => {
    setNowItem(element.title);
    setIsOpenItemList(false);
  };

  return (
    <div className={cn('container')}>
      <span className={cn('dropDownName')}>상태</span>
      <div className={cn('dropDown')}>
        <div
          className={cn('nowItem', { focus: isOpenItemList })}
          onClick={() => setIsOpenItemList((preStatus) => !preStatus)}
        >
          <ChipProgress column={nowItem} />
          <Image
            width={26}
            height={26}
            src="/assets/icon/dropDownArrowIcon.svg"
            alt="아래 삼각형 아이콘"
          />
        </div>
        {isOpenItemList && (
          <div className={cn('itemList')}>
            {itemList.map((element) => {
              let check = false;
              if (nowItem === element) {
                check = true;
              }

              return (
                <div
                  key={element}
                  className={cn('itemBox')}
                  onClick={() => onClickItem(element)}
                >
                  <div className={cn('check')}>
                    {check && (
                      <Image
                        width={22}
                        height={22}
                        src="/assets/icon/checkIcon.svg"
                        alt="check 아이콘"
                      />
                    )}
                  </div>
                  <div>
                    <ChipProgress column={element.title} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
