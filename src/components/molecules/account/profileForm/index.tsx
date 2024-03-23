import { UserChangeAccountProps } from '@/@types/type';
import { userChangeAccount } from '@/api/accountApi/accountApi';
import BaseModal from '@/components/atoms/baseModal/BaseModal';
import Button from '@/components/atoms/buttons/button';
import CommonInput from '@/components/atoms/input/common/CommonInput';
import ProfileImageInput from '@/components/molecules/profileImageInput/index';
import useAuth, { UserContextProps } from '@/hooks/useAuth';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './profileForm.module.scss';

const ProfileForm = () => {
  const { handleSubmit, register, watch } = useForm<UserChangeAccountProps>({
    mode: 'all',
  });

  const { userInfo: userData, setUserInfo } = useAuth();

  const [profileImage, setProfileImage] = useState<string>('');
  const [modal, setModal] = useState({
    isModalOpen: false,
    modalMessage: '',
  });

  const onSubmit = async (data: UserChangeAccountProps) => {
    try {
      await userChangeAccount({
        nickname: data.nickname,
        profileImageUrl: profileImage,
      });

      setModal({ isModalOpen: true, modalMessage: '프로필이 변경되었습니다.' });

      setUserInfo((prevState: UserContextProps) => ({
        ...prevState,
        nickname: data.nickname || userData.nickname,
        profileImageUrl: profileImage || userData.profileImageUrl,
      }));
    } catch (error) {
      console.error('닉네임 또는 프로필 이미지 변경 실패:', error);
    }
  };

  const watchFiled = watch(['nickname'], {
    nickname: '',
  });

  const isButtonDisabled = !profileImage && !watchFiled[0];

  const closeModal = () => {
    setModal({ isModalOpen: false, modalMessage: '' });
  };

  return (
    <div className={styles.container}>
      <h1>프로필</h1>
      <ProfileImageInput size="big" onImageSelected={setProfileImage} />
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
            disabled={isButtonDisabled}
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
