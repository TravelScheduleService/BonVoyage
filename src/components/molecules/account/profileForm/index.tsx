import styles from './profileForm.module.scss';
import ProfileImageInput from '@/components/molecules/profileImageInput/index';
import Button from '@/components/atoms/buttons/button';
<<<<<<< HEAD
import { useState, useContext } from 'react';
=======
import { useState, useContext, useEffect } from 'react';
>>>>>>> 0e0efe8da376f7d578bdde5a22969535502db927
import { userContext } from '@/pages/_app';
import { userChangeAccount } from '@/api/accountApi/accountApi';
import CommonInput from '@/components/atoms/input/common/CommonInput';
import { useForm } from 'react-hook-form';
import { UserChangeAccountProps, UserContextProps } from '@/@types/type';
import BaseModal from '@/components/atoms/baseModal/BaseModal';

const ProfileForm = () => {
  const { handleSubmit, register, watch, setValue } =
    useForm<UserChangeAccountProps>({
      mode: 'all',
    });

  const userInfo = useContext(userContext);
  const userData = userInfo.userInfo;

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

      userInfo.setUserInfo((prevState: UserContextProps) => ({
        ...prevState,
        nickname: data.nickname || userData.nickname,
        profileImageUrl: profileImage || userData.profileImageUrl,
      }));
    } catch (error) {
      console.error('닉네임 또는 프로필 이미지 변경 실패:', error);
    }
  };

<<<<<<< HEAD
  const watchFiled = watch(['nickname'], {
    nickname: '',
  });

  const isButtonDisabled = !profileImage && !watchFiled[0];

=======
>>>>>>> 0e0efe8da376f7d578bdde5a22969535502db927
  const closeModal = () => {
    setModal({ isModalOpen: false, modalMessage: '' });
  };

  useEffect(() => {
    setValue('nickname', userData.nickname);
  }, [userData.nickname]);

  return (
    <div className={styles.container}>
      <h1>프로필</h1>
      <ProfileImageInput
        size="big"
        onImageSelected={setProfileImage}
        initialImageUrl={userData.profileImageUrl}
      />
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
