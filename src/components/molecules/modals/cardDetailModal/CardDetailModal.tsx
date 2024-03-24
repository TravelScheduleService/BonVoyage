import { CardDetail } from '@/@types/type';
import instance from '@/api/axios';
import ChipTagWithoutX from '@/components/atoms/chipTag/ChipTagWithoutX';
import CreateDoItYourselfComment from '@/components/atoms/input/commentInput/CreateDoItYourselfComment';
import { format } from 'date-fns';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import CardDetailKebap from '../../cardDetailKebap/CardDetailKebap';
import ChipProgress from '../../chipProgress/ChipProgress';
import styles from './cardDetailModal.module.scss';

interface ModalProps {
  onClose: () => void;
  cardId?: number;
  columnTitle: string;
  getCards: () => void;
}

interface Comment {
  id: number;
  content: string;
  createdAt: string;
  author: {
    profileImageUrl: string | null;
    nickname: string;
  };
}

export default function CardDetailModal({
  onClose,
  cardId,
  columnTitle,
  getCards,
}: ModalProps) {
  const [cardDetail, setCardDetail] = useState<CardDetail>();
  const [commentList, setCommentList] = useState<Comment[]>([]);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editedCommentContent, setEditedCommentContent] = useState<string>('');
  const editCommentInputRef = useRef<HTMLTextAreaElement>(null);

  async function getCardDetail() {
    try {
      const res = await instance.get<CardDetail>(`/cards/${cardId}`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
        },
      });
      const cardInformation = res.data;
      setCardDetail(cardInformation);
    } catch (error) {
      console.error('Error fetching cardDetail:', error);
    }
  }

  async function getCommentList() {
    try {
      const res = await instance.get(`comments?size=10&cardId=${cardId}`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
        },
      });
      const comments = res.data.comments;
      setCommentList(comments);
    } catch (error) {
      console.error('Error fetching cardDetail:', error);
    }
  }

  useEffect(() => {
    getCardDetail();
    getCommentList();
  }, [cardId]);
  useEffect(() => {
    if (editingCommentId !== null && editCommentInputRef.current) {
      editCommentInputRef.current.focus();
      // 커서를 댓글 내용의 끝으로 이동.
      editCommentInputRef.current.setSelectionRange(
        editedCommentContent.length,
        editedCommentContent.length,
      );
    }
  }, [editingCommentId]);

  const handleEditComment = (commentId: number, initialContent: string) => {
    setEditingCommentId(commentId);
    setEditedCommentContent(initialContent);
  };

  const handleCommentUpdate = async (
    updatedContent: string,
    commentId: number,
  ) => {
    try {
      await instance.put(
        `/comments/${commentId}`,
        { content: updatedContent },
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        },
      );
      getCommentList();
      setEditingCommentId(null);
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  const handleCommentDelete = async (commentId: number) => {
    try {
      await instance.delete(`/comments/${commentId}`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      getCommentList();
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  if (!cardDetail) {
    return null;
  }

  return (
    <div className={styles['cardDetailModal']}>
      <div className={styles['modalContent']}>
        <div className={styles['topArea']}>
          <div className={styles['menuArea']}>
            <CardDetailKebap
              cardId={cardId}
              getCards={getCards}
              cardData={cardDetail}
            />
            <img
              className={styles['closeIcon']}
              alt="close icon"
              src="/assets/icon/closeIcon.svg"
              onClick={onClose}
            />
          </div>
          <h1 className={styles['title']}> {cardDetail?.title}</h1>
        </div>
        <div className={styles['mainArea']}>
          <div className={styles['infoArea']}>
            <div className={styles['userInfoArea']}>
              <h2 className={styles['infoTitle']}>담당자</h2>
              <div className={styles['userInfo']}>
                {cardDetail?.assignee && cardDetail.assignee.profileImageUrl ? (
                  <img
                    src={cardDetail.assignee.profileImageUrl}
                    alt="프로필 이미지"
                  />
                ) : (
                  <img
                    src="/assets/image/testProfile.png"
                    alt="기본 프로필 이미지"
                  />
                )}

                <span className={styles['name']}>
                  {cardDetail?.assignee ? cardDetail.assignee.nickname : ''}
                </span>
              </div>
            </div>
            <div className={styles['dateArea']}>
              <h2 className={styles['infoTitle']}>마감일</h2>
              <span className={styles['date']}>{cardDetail?.dueDate}</span>
            </div>
          </div>
          <div className={styles['contentArea']}>
            <div className={styles['tagArea']}>
              <ChipProgress column={columnTitle} />
              <div className={styles['line']}></div>
              <ChipTagWithoutX
                tag={cardDetail?.tags.join(' ')}
                color="pink"
              ></ChipTagWithoutX>
            </div>
            <p className={styles['description']}>{cardDetail?.description}</p>
            <div className={styles['imageArea']}>
              {cardDetail.imageUrl && (
                <Image
                  className={styles['image']}
                  src={cardDetail?.imageUrl}
                  width={300}
                  height={200}
                  alt="카드 이미지"
                />
              )}
            </div>
            <div className={styles['commentArea']}>
              <CreateDoItYourselfComment
                cardId={cardId}
                columnId={cardDetail ? cardDetail.columnId : null}
                dashboardId={cardDetail ? cardDetail.dashboardId : null}
                getCommentList={getCommentList}
              />
              <div className={styles['commentListArea']}>
                {commentList.map((comment) => (
                  <div className={styles['commentListArea']} key={comment.id}>
                    <div className={styles['commentWriterArea']}>
                      {comment.author.profileImageUrl ? (
                        <Image
                          className={styles['profileImage']}
                          width={26}
                          height={26}
                          alt="Profile image"
                          src={comment.author.profileImageUrl}
                        />
                      ) : (
                        <img src="/assets/image/testProfile.png" />
                      )}

                      <h1 className={styles['writerName']}>
                        {' '}
                        {comment.author.nickname}
                      </h1>
                      <span className={styles['createDate']}>
                        {format(comment.createdAt, 'yyyy-MM-dd HH:mm')}
                      </span>
                    </div>
                    {editingCommentId === comment.id ? (
                      <>
                        <textarea
                          className={styles['editCommentInput']}
                          value={editedCommentContent}
                          onChange={(e) =>
                            setEditedCommentContent(e.target.value)
                          }
                          ref={editCommentInputRef}
                        />
                        <div className={styles['buttonArea']}>
                          <span
                            className={styles['button']}
                            onClick={() =>
                              handleCommentUpdate(
                                editedCommentContent,
                                comment.id,
                              )
                            }
                          >
                            확인
                          </span>
                          <span
                            className={styles['button']}
                            onClick={() => setEditingCommentId(null)}
                          >
                            취소
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <span className={styles['commentText']}>
                          {comment.content}
                        </span>
                        <div className={styles['buttonArea']}>
                          <span
                            className={styles['button']}
                            onClick={() =>
                              handleEditComment(comment.id, comment.content)
                            }
                          >
                            수정
                          </span>
                          <span
                            className={styles['button']}
                            onClick={() => handleCommentDelete(comment.id)}
                          >
                            삭제
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
