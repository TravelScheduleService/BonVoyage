import { Card, CardDetail, ID } from '@/@types/type';
import axios from '../axios';

// 카드 생성
export const createCard = async (card: Card) => {
  try {
    const res = await axios.post<CardDetail>('cards', card);
    return res.data;
  } catch (error) {
    console.error('createCard:', error);
    throw error;
  }
};

// 카드 목록 조회
export const getCardList = async (columnId: ID) => {
  try {
    const res = await axios.get<{ cards: CardDetail[] }>(
      `/cards?size=10&columnId=${columnId}`,
    );
    return res.data;
  } catch (error) {
    console.error('getCards:', error);
    throw error;
  }
};

// 카드 수정
export const updateCard = async (card: Card) => {
  try {
    const res = await axios.put<Card>(`cards/${card.id}`, card);
    return res.data;
  } catch (error) {
    console.error('updateCard:', error);
    throw error;
  }
};

// 카드 삭제
export const deleteCard = async (id: number) => {
  try {
    const res = await axios.delete<Card>(`cards/${id}`);
    return res.data;
  } catch (error) {
    console.error('deleteCard:', error);
    throw error;
  }
};

// 카드 상세 조회
export const getDetailCard = async (id: number) => {
  try {
    const res = await axios.get<Card>(`cards/${id}`);
    return res.data;
  } catch (error) {
    console.error('getDetailCard:', error);
    throw error;
  }
};
