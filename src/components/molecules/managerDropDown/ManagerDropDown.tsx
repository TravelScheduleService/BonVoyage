import { ChangeEvent, useState } from 'react';
import styles from './managerDropDown.module.scss';
import classNames from 'classnames/bind';
import Image from 'next/image';
import { MemberProfile } from '@/@types/type';

const cn = classNames.bind(styles);

interface Props {
  members: MemberProfile[];
}

export default function ManagerDropDown({ members }: Props) {
  const [manager, setManager] = useState<MemberProfile | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [memberList] = useState(members);
  const [isOpenMemberList, setIsOpenMemberList] = useState(false);

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsOpenMemberList(true);
  };

  const onClickItem = (element: MemberProfile) => {
    setManager(element);
    setInputValue('');
    setIsOpenMemberList(false);
  };

  return (
    <div className={cn('container')}>
      <span className={cn('dropDownName')}>담당자</span>
      <div className={cn('dropDown')}>
        <div className={cn('manager', { focus: isOpenMemberList })}>
          <input
            className={cn('input')}
            value={inputValue}
            onChange={onChangeInput}
            onFocus={() => setIsOpenMemberList(true)}
          />
          {manager && !inputValue && (
            <div className={cn('member', 'selected')}>
              <Image
                width={26}
                height={26}
                src={manager.imageUrl}
                alt="프로필 이미지"
              />
              <span>{manager.nickname}</span>
            </div>
          )}
          <Image
            className={cn('dropDownMenu')}
            width={26}
            height={26}
            src="/assets/icon/dropDownArrowIcon.svg"
            alt="아래 삼각형 아이콘"
            onClick={() => setIsOpenMemberList((preStatus) => !preStatus)}
          />
        </div>
        {isOpenMemberList && (
          <div className={cn('itemList')}>
            {memberList
              .filter((element) => {
                return inputValue
                  ? element.nickname.includes(inputValue)
                  : true;
              })
              .map((element) => {
                let check = false;
                if (manager?.nickname === element.nickname) {
                  check = true;
                }

                return (
                  <div
                    className={cn('itemBox')}
                    key={element.nickname}
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
                    <div className={cn('member')}>
                      <Image
                        width={26}
                        height={26}
                        src={element.imageUrl}
                        alt="프로필 이미지"
                      />
                      <span>{element.nickname}</span>
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
