declare module '*.scss';

interface AuthRequest {
  email: string;
  nickname?: string;
  password: string;
  passwordConfirm?: string;
}

interface ErrorResponse {
  message?: string;
}
