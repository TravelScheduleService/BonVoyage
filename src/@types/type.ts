import { StaticImageData } from 'next/image';
import { HTMLInputTypeAttribute, ReactNode } from 'react';

//타입 들어갈곳
export interface ButtonProps {
  name?: string;
  disabled?: boolean;
  type?: string;
  color?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

// 할 일 모달 Input props
export interface CreateDoItYourselfProps {
  title: string;
  content?: string;
  className?: string;
  icon?: ReactNode;
  name?: string;
  required?: boolean;
  isVertical?: boolean;
  isSpecialInput?: boolean; // 특수한 input이 필요한 경우 사용
  type?: HTMLInputTypeAttribute | 'textarea';
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export interface MemberProfile {
  nickname: string;
  imageUrl: string;
}

export interface MyDashboardProps extends ButtonProps {
  src: StaticImageData;
  src2?: StaticImageData;
  iconAlt?: string;
}
