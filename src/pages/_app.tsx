import '@/styles/globals.css';
import '@/styles/datePicker.css';
import 'react-datepicker/dist/react-datepicker.css';
import { UserContextProps } from '@/@types/type';
import React, { useState, useEffect } from 'react';
import { userInfoData } from '@/api/accountApi/accountApi';
import type { AppProps } from 'next/app';

export const userContext = React.createContext<UserContextProps>({
  userInfo: {
    id: 0,
    email: '',
    nickname: '',
    createdAt: '',
    updatedAt: '',
  },
  setUserInfo: () => {},
});

function App({ Component, pageProps }: AppProps) {
  const [userInfo, setUserInfo] = useState({
    id: 0,
    email: '',
    nickname: '',
    profileImageUrl: '',
    createdAt: '',
    updatedAt: '',
  });

  const getUserInfo = async () => {
    const userData = await userInfoData();
    setUserInfo(userData);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <userContext.Provider value={{ userInfo, setUserInfo }}>
      <div id="modal" />
      <Component {...pageProps} />
    </userContext.Provider>
  );
}
export default App;
