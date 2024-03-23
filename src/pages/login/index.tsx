import { AuthResponse, User } from '@/@types/type';
import { login } from '@/api/auth/authApi';
import Button from '@/components/atoms/buttons/button';
import EmailInput from '@/components/atoms/input/emailInput/EmailInput';
import PasswordInput from '@/components/atoms/input/passwordInput/PasswordInput';
import useAuth from '@/hooks/useAuth';
import useSessionStorage from '@/hooks/useSessionStorage';
import { AxiosError } from 'axios';
import { getSession, signIn } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './login.module.scss';

interface SignInProps extends AuthRequest {
  email: string;
  nickname: string;
  password: string;
  passwordConfirm: string;
}

const MobileLogo = () => (
  <Image
    src="/assets/icon/bonVoyageMobileLogo.svg"
    width={150}
    height={150}
    alt="Mobile Logo"
  />
);

const DesktopLogo = () => (
  <Image
    src="/assets/icon/bonVoyageLogo.svg"
    width={500}
    height={100}
    alt="Desktop Logo"
  />
);

const GoogleIcon = () => (
  <Image
    src="/assets/icon/googleIcon.svg"
    width={20}
    height={20}
    alt="Google Icon"
    className={styles.googleIcon}
  />
);

const KakaoIcon = () => (
  <Image
    src="/assets/icon/kakaotalkIcon.svg"
    width={20}
    height={20}
    alt="Kakao Icon"
  />
);

export default function Login() {
  const { setAccessToken, setUserInfo } = useAuth();
  const [user, setUser] = useSessionStorage<User | {}>('user', {});
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const form = useForm<SignInProps>({ mode: 'all' });
  const {
    handleSubmit,
    register,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = form;

  const onSubmit: SubmitHandler<SignInProps> = async (payload: AuthRequest) => {
    clearErrors('root');
    try {
      const { accessToken, user } = await login(payload);
      setAccessToken(accessToken);
      setUser(user);
      setUserInfo(user); // user정보를 로그인하고 바로 업데이트
      router.push('/mydashboard');
    } catch (error) {
      const axiosError = error as AxiosError<AuthResponse>;
      setError(
        'root',
        axiosError.response?.data || { message: '로그인에 실패했습니다.' },
      );
    }
  };

  const handleSignUpLinkClick = () => {
    router.push('/signUp');
  };

  const handleLogoClick = () => {
    router.push('/');
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const handleMediaQueryChange = (
      e: MediaQueryListEvent | MediaQueryList,
    ) => {
      setIsMobile(e.matches);
    };

    handleMediaQueryChange(mediaQuery);

    mediaQuery.addEventListener('change', handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginLogoContainer}>
        <div className={styles.loginLogo} onClick={handleLogoClick}>
          {isMobile ? <MobileLogo /> : <DesktopLogo />}
        </div>
        <span className={styles.loginNiceMeetYouText}>
          오늘도 만나서 반가워요!
        </span>
      </div>
      <form
        className={styles.loginFormContainer}
        onSubmit={handleSubmit(onSubmit)}
      >
        <EmailInput errors={errors} register={register} />
        <PasswordInput errors={errors} register={register} />
        <Button
          buttonProps={{ type: 'submit' }}
          disabled={!isValid}
          name="로그인"
          type="account"
        />
        {errors.root && (
          <div className={styles.errorMessage}>{errors.root.message}</div>
        )}
        <hr className={styles.divider} />
        <Button
          icon={GoogleIcon()}
          name="구글로 로그인"
          onClick={() => signIn('google', { callbackUrl: '/mydashboard' })}
          type="google"
        />
        <Button
          icon={KakaoIcon()}
          name="카카오 로그인"
          onClick={async () => {
            signIn('kakao'); //, { callbackUrl: '/mydashboard' });
            const session = await getSession();
            console.log(session);
          }}
          type="kakao"
        />
      </form>
      <div className={styles.signUpLinkBox}>
        회원이 아니신가요?
        <span className={styles.signUpLinkText} onClick={handleSignUpLinkClick}>
          회원가입하기
        </span>
      </div>
    </div>
  );
}
