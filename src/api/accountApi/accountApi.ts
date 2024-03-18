import axios from '@/api/axios';
import { UserChangePasswordProps, UserChangeAccountProps } from '@/@types/type';

export const userInfoData = async () => {
  try {
    const res = await axios.get('/users/me');
    return res.data;
  } catch (error) {
    console.error('emailError:', error);
    return null;
  }
};

//내정보 조회 할 수 있는 api, email, nickname, profileImage이 들어가있다.

export const userChangePassword = async ({
  password,
  newPassword,
}: UserChangePasswordProps) => {
  try {
    const res = await axios.put('/auth/password', {
      password: password,
      newPassword: newPassword,
    });
    return res;
  } catch (error) {
    console.error('passwordChangeError:', error);
    return error;
  }
};

//비밀번호 변경 api

export const userChangeAccount = async ({
  nickname,
  profileImageUrl,
}: UserChangeAccountProps) => {
  try {
    const requestData = {};
    if (nickname) {
      requestData.nickname = nickname;
    }
    if (profileImageUrl) {
      requestData.profileImageUrl = profileImageUrl;
    }
    const res = await axios.put('/users/me', requestData);
    return res.data;
  } catch (error) {
    console.error('nicknameError:', error);
    return error;
  }
};
// 닉네임, 프로필이미지 변경, 에러해결 필요

export const userUploadImage = async (profileImage: File) => {
  try {
    const formData = new FormData();
    formData.append('image', profileImage);
    const res = await axios.post('/users/me/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    const imageUrl = res.data.profileImageUrl;
    return imageUrl;
  } catch (error) {
    console.error('프로필 이미지 변경 실패:', error);
    return null;
  }
};
// 이미지 업로드해서 서버로 보내는 api
