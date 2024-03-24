import { CreateDoItYourselfProps } from '@/@types/type';
import instance from '@/api/axios';
import { PropsWithChildren, useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './createDoItYourselfTextarea.module.scss';

interface CommentData {
  content: string;
  cardId: number;
  columnId: number;
  dashboardId: number;
}

export interface CommentProps {
  cardId: number;
  columnId: number;
  dashboardId: number;
  getCommentList?: () => void;
}

interface Props extends PropsWithChildren<CreateDoItYourselfProps> {
  commentProp: CommentProps | null;
}

export default function CreateDoItYourselfTextarea({
  title,
  commentProp,
}: Props) {
  const { register, handleSubmit } = useForm();
  const [content, setContent] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  const onSubmit = async () => {
    try {
      const commentData: CommentData = {
        content: content,
        cardId: commentProp.cardId,
        columnId: commentProp.columnId,
        dashboardId: commentProp.dashboardId,
      };
      const res = await instance.post('/comments', commentData, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
        },
      });
      console.log('Comment added successfully:', res.data);
      commentProp.getCommentList();
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
      <label className={styles.labelContainer}>{title}</label>
      <textarea
        {...register('comment')}
        placeholder={content}
        className={styles.textareaContainer}
        value={content}
        onChange={handleInputChange}
      />
      <button type="submit" className={styles.submitButton}>
        입력
      </button>
    </form>
  );
}
