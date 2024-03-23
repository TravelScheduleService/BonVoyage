import { User } from '@/@types/type';
import { UserContextProvider } from '@/hooks/useAuth';
import '@/styles/datePicker.css';
import '@/styles/globals.css';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';

function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  const [userInfo, setUserInfo] = useState<User>({
    id: 0,
    email: '',
    nickname: '',
    profileImageUrl: '',
    createdAt: '',
    updatedAt: '',
  });

  return (
    <UserContextProvider value={{ userInfo, setUserInfo }}>
      <SessionProvider session={session}>
        <div id="modal" />
        <Component {...pageProps} />
      </SessionProvider>
    </UserContextProvider>
  );
}
export default App;
