import React, { useEffect, useState } from 'react';
import styles from './card.module.scss';
import Image from 'next/image';
import calendarIcon from '../../../../public/assets/icon/calendarIcon.svg';
import ChipTagWithoutX from '@/components/atoms/chipTag/ChipTagWithoutX';
import instance from '@/api/axios';
import { format } from 'date-fns';
import CardDetailModal from '../modals/cardDetailModal/CardDetailModal';
import ProfileIcon from '@/components/atoms/profileIcon/ProfileIcon';

interface Card {
  id: number;
  title: string;
  imageUrl: string;
  tags: string[];
  createdAt: string;
  assignee: {
    nickname: string;
    profileImageUrl: string;
  };
}

const colors: Array<'orange' | 'pink' | 'blue' | 'green'> = [
  'orange',
  'green',
  'pink',
  'blue',
];

interface CardProps {
  columnId: number;
  columnTitle: string;
  handleCardsData: (cardsData: []) => void;
}

export default function Card({
  columnId,
  columnTitle,
  handleCardsData,
  columns,
}: CardProps) {
  const [cards, setCards] = useState<Card[]>([]);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [clickedCardId, setClickedCardId] = useState<number>();

  async function getCards() {
    try {
      const res = await instance.get<{ cards: Card[] }>(
        `/cards?size=10&columnId=${columnId}`,
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
          },
        },
      );
      const nextCards = res.data.cards;
      setCards(nextCards);
      handleCardsData(nextCards);
    } catch (error) {
      console.error('Error fetching cards:', error);
    }
  }

  useEffect(() => {
    if (columnId !== undefined) {
      getCards();
    }
  }, [columnId, cards]);

  const handleCardClick = (cardId: number) => {
    setClickedCardId(cardId);
    setIsDetailModalOpen(true);
  };

  const closeModal = () => {
    setIsDetailModalOpen(false);
  };

  return (
    <div>
      {cards?.map((card) => (
        <div
          key={card.id}
          className={styles['card']}
          onClick={() => handleCardClick(card.id)}
        >
          {card.imageUrl && (
            <img
              className={styles['cardImage']}
              src={card.imageUrl}
              alt="Card Image"
            />
          )}
          <div className={styles['infoArea']}>
            <span className={styles['cardTitle']}>{card.title}</span>
            <div className={styles['tagDateArea']}>
              {card.tags && (
                <div className={styles['tagArea']}>
                  {card.tags.map((tag, index) => (
                    <ChipTagWithoutX tag={tag} color={colors[index % 4]} />
                  ))}
                </div>
              )}

              <div className={styles['dateProfileArea']}>
                <div className={styles['dateArea']}>
                  <Image
                    className={styles['calendarIcon']}
                    src={calendarIcon}
                    alt="calendarIcon"
                  />
                  <span className={styles['date']}>
                    {format(card.createdAt, 'yyyy-MM-dd HH:mm')}
                  </span>
                </div>
                {card.assignee && (
                  <ProfileIcon
                    name={card.assignee.nickname}
                    profile={card.assignee.profileImageUrl}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
      {isDetailModalOpen && (
        <CardDetailModal
          onClose={closeModal}
          cardId={clickedCardId}
          columnTitle={columnTitle}
          getCards={getCards}
          columns={columns}
        />
      )}
    </div>
  );
}
