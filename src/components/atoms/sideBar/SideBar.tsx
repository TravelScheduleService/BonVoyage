import styles from './sideBar.module.scss';
import classNames from 'classnames/bind';
import Image from 'next/image';

import addBoxIcon from '../../../../public/assets/icon/addBoxIcon.svg';
import SideBarMenu from '../sideBarMenu/SideBarMenu';
import Link from 'next/link';
import LogoWithTitle from '../logoWithTitle/LogoWithTitle';
import { useEffect, useRef, useState } from 'react';
import {
  getMyDashboardList,
  postNewDashboard,
} from '@/api/dashboardListApi/dashboardListApi';
import { CreateDashboard, Dashboard } from '@/@types/type';
import PagenationBtn from '../buttons/pagenationBtn';
import CreateDashboardModal from '@/components/molecules/createDashboardModal/CreateDashboardModal';
import { useRouter } from 'next/router';

const cn = classNames.bind(styles);

interface prop {
  path?: string;
}
export default function SideBar({ path }: prop) {
  const [dashboardList, setDashboardList] = useState<Dashboard[]>([]);
  const [dashboardListPage, setDashboardListPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [dashboardListTotalPage, setDashboardListTotalPage] = useState(0);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const sideBar = useRef<HTMLDivElement>(null);
  const startMenu = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const onClickPageButtonLeft = () => {
    setDashboardListPage((prevPage) => prevPage - 1);
  };

  const onClickPageButtonRight = () => {
    setDashboardListPage((prevPage) => prevPage + 1);
  };

  const onClickCloseModal = () => {
    setIsOpenModal(false);
  };

  const onClickCreateDashboard = async (createDashboard: CreateDashboard) => {
    const response = await postNewDashboard(createDashboard);

    router.push(`/dashboard/${response.id}`);
  };

  useEffect(() => {
    function isScroll() {
      if (!sideBar.current) {
        return;
      }

      if (startMenu.current) {
        const clinetRect = startMenu.current.getBoundingClientRect();
        setPageSize(
          Math.max(
            Math.min(
              Math.floor((window.innerHeight - 160 - clinetRect.top) / 45),
              8,
            ),
            1,
          ),
        );
      }
    }
    isScroll();

    window.addEventListener('resize', isScroll);

    return () => {
      window.removeEventListener('resize', isScroll);
    };
  }, []);

  useEffect(() => {
    async function setMyDashboardList() {
      try {
        const response = await getMyDashboardList(dashboardListPage, pageSize);

        setDashboardListTotalPage(Math.ceil(response.totalCount / pageSize));
        setDashboardList(response.dashboards);
      } catch (error) {
        console.log(error);
      }
    }

    setMyDashboardList();
  }, [dashboardListPage, pageSize]);

  return (
    <>
      <div className={cn('sidebar')} ref={sideBar}>
        <div className={styles['logoArea']}>
          <LogoWithTitle />
        </div>
        <div className={styles['menuArea']}>
          <div className={styles['menuTitleArea']}>
            <h1 className={styles['menuTitle']}>Dash Boards</h1>
            <button
              className={styles['addBox']}
              onClick={() => setIsOpenModal(true)}
            >
              <Image src={addBoxIcon} width={20} height={20}></Image>
            </button>
          </div>
          <div ref={startMenu} />
          {dashboardList.map((element) => {
            return (
              <Link href={`/dashboard/${element.id}`} key={element.id}>
                <a>
                  <SideBarMenu
                    menuTitle={element.title}
                    color={element.color}
                    isCreatedByMe={element.createdByMe}
                  />
                </a>
              </Link>
            );
          })}
          {/* <Link href={`${path}`}>
          <SideBarMenu menuTitle="코드잇" />
        </Link> */}
        </div>
        <div className={cn('pagenation')}>
          <PagenationBtn
            onClickLeft={onClickPageButtonLeft}
            onClickRight={onClickPageButtonRight}
            nowPage={dashboardListPage}
            totalPage={dashboardListTotalPage}
          />
          <div className={styles['page']}>
            {dashboardListPage} of {dashboardListTotalPage}
          </div>
        </div>
      </div>
      {isOpenModal && (
        <CreateDashboardModal
          onClickAccept={onClickCreateDashboard}
          onClickCloseModal={onClickCloseModal}
        />
      )}
    </>
  );
}
