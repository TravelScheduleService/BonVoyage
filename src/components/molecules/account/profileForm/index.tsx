import styles from './profileForm.module.scss';
import ImageInput from '@/components/molecules/imageInput/ImageInput';
import Button from '@/components/atoms/buttons/button';
import { useState,useContext } from 'react';
import { userContext } from '@/pages/mypage/index';
import { userChangeAccount } from '@/api/accountApi/accountApi';
import CommonInput from '@/components/atoms/input/common/CommonInput';
import { useForm } from 'react-hook-form';
import {UserChangeAccountProps} from '@/@types/type';


const ProfileForm = () => {
  const { handleSubmit, register, reset } = useForm<UserChangeAccountProps>({ mode: 'all' }); 
  const userInfo = useContext(userContext);
  const [profileImageUrl, setProfileImageUrl] = useState<string>('');

  const onSubmit = async (data: UserChangeAccountProps) => {
    try {
      await userChangeAccount({
        nickname: data.nickname,
        profileImageUrl,
      });
      reset()
      setProfileImageUrl('');
    } catch (error) {
      console.error('닉네임 또는 프로필 이미지 변경 실패:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>프로필</h1>
      <ImageInput size="big" onImageSelected={setProfileImageUrl} />
      <form className={styles.inputContainer} onSubmit={handleSubmit(onSubmit)}>
        <CommonInput
          label="이메일"
          placeholder={userInfo.email}
          disabled={true}
          errors={{}}
          type="email"
          name="email"
          register={register}
        />
        <CommonInput
          label="닉네임"
          placeholder="닉네임을 입력해주세요"
          errors={{}}
          type="text"
          name="nickname"
          register={register}
        />
        <div className={styles.ButtonContainer}>
          <Button
            name="저장"
            type="modal"
            color="blue"
            onClick={handleSubmit(onSubmit)}
          />
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
