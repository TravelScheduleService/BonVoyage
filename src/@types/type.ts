//타입 들어갈곳

import { StaticImageData } from 'next/image';
export interface ButtonProps {
  name?: string;
  disabled?: boolean;
  type?: string;
  color?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export interface MyDashboardProps extends ButtonProps {
  src: StaticImageData;
  src2?: StaticImageData;
  iconAlt?: string;
}

export interface MemberProfile {
  nickname: string;
  imageUrl: string;
}

export interface IconProps {
  color?: string;
}

export interface User {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
}
