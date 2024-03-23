import { atom } from 'jotai';
interface Card {
  id: number;
  title: string;
  imageUrl: string;
  tags: string[];
  createdAt: string;
  assignee: {
    profileImageUrl: string;
  };
}

export const cardsAtom = atom<Card[]>([]);
