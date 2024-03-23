import { User } from '@/@types/type';
import { userInfoData } from '@/api/accountApi/accountApi';
import { useSession } from 'next-auth/react';
import React, { useContext, useEffect } from 'react';
import useSessionStorage from './useSessionStorage';

export interface UserContextProps {
  userInfo: User;
  setUserInfo: (userInfo: any) => void;
}

const userContext = React.createContext<UserContextProps>({
  userInfo: {
    id: 0,
    email: '',
    nickname: '',
    profileImageUrl: '',
    createdAt: '',
    updatedAt: '',
  },
  setUserInfo: () => {},
});

export const UserContextProvider = userContext.Provider;

export default function useAuth() {
  const { setUserInfo, userInfo } = useContext(userContext);
  const { data, status, update } = useSession();
  const [accessToken, setAccessToken] = useSessionStorage(
    'accessToken', // key for sessionStorage
    '', // 초기값
    true, // JSON 형태로 저장하지 않음
  );

  const getUserInfo = async () => {
    const userData = await userInfoData();
    if (userData) {
      setUserInfo(userData);
    }
  };

  useEffect(() => {
    if (accessToken) {
      getUserInfo();
      return;
    }
    if (!data) {
      return;
    }
    const { user } = data;
    if (user) {
      setUserInfo({
        email: user.email,
        nickname: user.name,
        profileImageUrl: user.image,
      });
      const { accessToken } = user as any;
      if (accessToken) {
        setAccessToken(accessToken);
      }
    }
    // eslint-disable-next-line
  }, [accessToken, data]);

  return {
    accessToken,
    setAccessToken,
    setUserInfo,
    userInfo,
    status: accessToken ? 'authenticated' : status,
  };
}
