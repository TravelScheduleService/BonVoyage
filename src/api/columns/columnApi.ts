import { Column } from '@/@types/type';
import axios from '../axios';

// 카드 이미지 업로드
export const uploadCardImage = async (columnId: number, image: File) => {
  try {
    const formData = new FormData();
    formData.append('image', image);

    const res = await axios.post<Column>(
      `columns/${columnId}/card-image`,
      formData,
    );
    return res.data;
  } catch (error) {
    console.error('uploadCardImage:', error);
    throw error;
  }
};
