import React, { createContext, useContext, useState } from 'react';

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

interface CardsContextType {
  cards: Card[];
  setCards: React.Dispatch<React.SetStateAction<Card[]>>;
}

const CardsContext = createContext<CardsContextType | undefined>(undefined);

export const useCardsContext = () => {
  const context = useContext(CardsContext);

  return context;
};

export const CardsProvider: React.FC = ({ children }) => {
  const [cards, setCards] = useState<Card[]>([]);

  return React.createElement(
    CardsContext.Provider,
    { value: { cards, setCards } },
    children,
  );
};
