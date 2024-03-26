import CommonInput from '@/components/atoms/input/common/CommonInput';
import styles from './passwordChangeForm.module.scss';
import Button from '@/components/atoms/buttons/button';
import { useState } from 'react';
import { userChangePassword } from '@/api/accountApi/accountApi';
import { useForm } from 'react-hook-form';
import BaseModal from '@/components/atoms/baseModal/BaseModal';
import { passwordFromProps } from '@/@types/type';

const PasswordChangeForm = () => {
  const {
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors },
  } = useForm<passwordFromProps>({ mode: 'all' });

  const [modal, setModal] = useState({
    isModalOpen: false,
    modalMessage: '',
  });

  const onSubmit = async (data: passwordFromProps) => {
    const res: any = await userChangePassword({
      password: data.password,
      newPassword: data.newPassword,
    });

    if (res.status === 204) {
      setModal({
        isModalOpen: true,
        modalMessage: '비밀번호가 변경되었습니다.',
      });
      reset();
      return;
    }
    setModal({
      isModalOpen: true,
      modalMessage: '현재 비밀번호를 확인해주세요.',
    });
  };

  const closeModal = () => {
    setModal({ isModalOpen: false, modalMessage: '' });
  };

  const watchFields = watch(['password', 'newPassword', 'newPasswordConfirm'], {
    password: '',
    newPassword: '',
    newPasswordConfirm: '',
  });

  return (
    <div className={styles.container}>
      <h1>비밀번호 변경</h1>
      <form className={styles.inputContainer} onSubmit={handleSubmit(onSubmit)}>
        <CommonInput
          label="현재 비밀번호"
          placeholder="현재 비밀번호 입력"
          type="password"
          errors={{}}
          name="password"
          register={register}
        />
        <CommonInput
          label="새 비밀번호"
          placeholder="새 비밀번호 입력"
          type="password"
          errors={errors}
          name="newPassword"
          register={register}
          registerOptions={{
            minLength: {
              value: 8,
              message: '8자 이상 입력해주세요.',
            },
          }}
        />
        <CommonInput
          label="새 비밀번호 확인"
          placeholder="새 비밀번호 입력"
          type="password"
          errors={errors}
          name="newPasswordConfirm"
          register={register}
          registerOptions={{
            validate: {
              matchesConfirmation: (value, { newPassword }) =>
                value === newPassword || '비밀번호가 일치하지 않습니다.',
            },
          }}
        />
        <div className={styles.ButtonContainer}>
          <Button
            name="변경"
            type="modal"
            color="blue"
            onClick={handleSubmit(onSubmit)}
            disabled={!watchFields.every((field) => field)}
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
export default PasswordChangeForm;

