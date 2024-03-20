import styles from './profileForm.module.scss';
import ImageInput from '@/components/molecules/imageInput/ImageInput';
import Button from '@/components/atoms/buttons/button';
import { useState, useContext,useEffect } from 'react';
import { userContext } from '@/pages/mypage/index';
import { userChangeAccount } from '@/api/accountApi/accountApi';
import CommonInput from '@/components/atoms/input/common/CommonInput';
import { useForm } from 'react-hook-form';
import { UserChangeAccountProps, UserContextProps } from '@/@types/type';
import BaseModal from '@/components/atoms/baseModal/BaseModal';

const ProfileForm = () => {
  const { handleSubmit, register, reset, watch } =
    useForm<UserChangeAccountProps>({
      mode: 'all',
    });

  const userInfo = useContext(userContext);
  const userData = userInfo.userInfo;

  const [profileImageUrl, setProfileImageUrl] = useState<string>('');
  const [modal, setModal] = useState({
    isModalOpen: false,
    modalMessage: '',
  });

  const onSubmit = async (data: UserChangeAccountProps) => {
 
    try {
      await userChangeAccount({
        nickname: data.nickname,
        profileImageUrl: profileImageUrl,
      });
      setModal({ isModalOpen: true, modalMessage: '프로필이 변경되었습니다.' });
      reset();
      setProfileImageUrl('');
      userInfo.setUserInfo((prevState: UserContextProps) => ({
        ...prevState,
        nickname: data.nickname,
        profileImageUrl: profileImageUrl,
      }));
    } catch (error) {
      console.error('닉네임 또는 프로필 이미지 변경 실패:', error);
    }
  };

  const watchFiled = watch(['nickname'], {
    nickname: '',
  });

  const closeModal = () => {
    setModal({ isModalOpen: false, modalMessage: '' });
  };

  return (
    <div className={styles.container}>
      <h1>프로필</h1>
      <ImageInput size="big" onImageSelected={setProfileImageUrl} />
      <form className={styles.inputContainer} onSubmit={handleSubmit(onSubmit)}>
        <CommonInput
          label="이메일"
          placeholder={userData.email}
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
            disabled={!watchFiled.every((field) => field)}
          />
          {modal.isModalOpen && (
            <BaseModal closeModal={closeModal}>
              <div className={styles.modalContainer}>
                <p>{modal.modalMessage}</p>
                <div className={styles.modalBtn}>
                  <Button
                    name="확인"
                    type="modal"
                    color="blue"
                    onClick={closeModal}
                  />
                </div>
              </div>
            </BaseModal>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
