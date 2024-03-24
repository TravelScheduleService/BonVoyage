import { Member, MemberProfile } from '@/@types/type';
import { getMemberList } from '@/api/members/memberApi';
import { useDashboardState } from '@/hooks/contexts';
import classNames from 'classnames/bind';
import Image from 'next/image';
import {
  ChangeEvent,
  Dispatch,
  HTMLAttributes,
  useEffect,
  useState,
} from 'react';
import defaultImage from '../../../../public/assets/image/testProfile.png';
import styles from './managerDropDown.module.scss';

const cn = classNames.bind(styles);

interface Props {
  defaultValue?: MemberProfile;
  inputProps?: HTMLAttributes<HTMLInputElement>;
  onChange?: Dispatch<MemberProfile>;
}

export default function ManagerDropDown({
  defaultValue,
  inputProps = {},
  onChange,
}: Props) {
  const [dashboard] = useDashboardState();
  const [members, setMembers] = useState<Member[]>([]);
  const [manager, setManager] = useState<MemberProfile | undefined>(
    defaultValue,
  );
  const [inputValue, setInputValue] = useState('');
  const [isOpenMemberList, setIsOpenMemberList] = useState(false);
  const [selectedManagerId, setSelectedManagerId] = useState<
    number | undefined
  >(defaultValue?.id);
  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsOpenMemberList(true);
  };

  const onClickItem = (element: MemberProfile) => {
    onChange?.(element);
    setManager(element);
    setSelectedManagerId(element.id);
    setInputValue('');
    setIsOpenMemberList(false);
  };

  async function fetchMembers() {
    try {
      const memberData = await getMemberList(dashboard?.id as number); // 멤버 목록 가져오기
      setMembers(memberData.members);
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  }

  useEffect(() => {
    fetchMembers();
  }, []); // 컴포넌트가 마운트될 때만 실행

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
            {...inputProps}
          />

          {manager && !inputValue ? (
            <div className={cn('member', 'selected')}>
              <Image
                width={26}
                height={26}
                src={manager.profileImageUrl || defaultImage}
                alt="프로필 이미지"
              />
              <span>{manager.nickname}</span>
            </div>
          ) : null}

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
            {members
              .filter((element) => {
                return inputValue
                  ? element.nickname.includes(inputValue)
                  : true;
              })
              .map((element) => {
                let check = selectedManagerId === element.id;

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
                        src={element.profileImageUrl || defaultImage}
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
