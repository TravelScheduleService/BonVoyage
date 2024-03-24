import {
  ButtonHTMLAttributes,
  ChangeEventHandler,
  ForwardedRef,
  HTMLInputTypeAttribute,
  ReactNode,
} from 'react';
import { ChangeHandler } from 'react-hook-form';

export interface ButtonProps {
  name?: string;
  disabled?: boolean;
  type?: string;
  color?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onClickLeft?: () => void;
  onClickRight?: () => void;
  nowPage?: number;
  totalPage?: number;
  icon?: ReactNode;
  buttonProps?: ButtonHTMLAttributes<HTMLButtonElement>;
}

// 할 일 모달 Input props
export interface CreateDoItYourselfProps
  extends InputHTMLAttributes<HTMLInputElement> {
  title: string;
  content?: string;
  icon?: ReactNode;
  ref?: ForwardedRef<HTMLInputElement>;
  isVertical?: boolean;
  isSpecialInput?: boolean; // 특수한 input이 필요한 경우 사용
  type?: HTMLInputTypeAttribute | 'textarea';
  onChange?: ChangeEventHandler | ChangeHandler;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

// 담당자 드롭다운 멤버 프로필
export interface MemberProfile {
  id: number;
  nickname: string;
  profileImageUrl: string;
}

export interface MyDashboardProps extends ButtonProps {
  src: JSX.Element;
  src2?: string;
  iconAlt?: string;
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

export interface CreateDashboard {
  title: string;
  color: string;
}

export interface Dashboard {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
  userId: number;
}

// 초대된 대시보드
export interface Invitation {
  id: number;
  inviter: {
    nickname: string;
    email: string;
    id: number;
  };
  teamId: string;
  dashboard: {
    title: string;
    id: number;
  };
  invitee: {
    nickname: string;
    email: string;
    id: number;
  };
  inviteAccepted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserChangePasswordProps {
  password: string;
  newPassword: string;
}

export interface UserChangeAccountProps {
  nickname: string;
  profileImageUrl: string;
}

export interface passwordFromProps {
  password: string;
  newPassword: string;
  newPasswordConfirm: string;
}

export interface AuthResponse extends ErrorResponse {
  user: User;
  accessToken: string;
}

export interface Card {
  assigneeUserId: number;
  dashboardId: number;
  columnId: number;
  title: string;
  description: string;
  dueDate: string;
  tags: string[];
  imageUrl: string;
}

export interface CardDetail {
  title: string;
  assignee?: MemberProfile;
  dueDate: string;
  tags: string[];
  description: string;
  imageUrl: string;
  columnId: number;
  dashboardId: number;
}

export interface Member extends MemberProfile {
  teamId: string;
  page?: number;
  size?: number;
  dashboardId: number;
}

export interface Column {
  id: number;
  title: string;
  teamId: string;
  dashboardId: number;
  createdAt?: string;
  updatedAt?: string;
  imageUrl: string;
}

export interface ProfileDownProps {
  onBlur: React.FocusEventHandler<HTMLDivElement>;
}
