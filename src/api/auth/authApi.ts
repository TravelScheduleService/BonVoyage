import { AuthResponse, User, UserResponse } from '@/@types/type';
import axios from '../axios';
import { AxiosError } from 'axios';

export const login = async (userData: AuthRequest) => {
  try {
    const res = await axios.post<AuthResponse>('auth/login', userData);
    return res.data;
  } catch (error) {
    console.error('loginError:', error);
    throw error;
  }
};

export const signUp = async (userData: AuthRequest) => {
  try {
    const res = await axios.post<User>('users', userData);
    return res.data;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    console.error('signUpError:', axiosError.response?.data?.message ?? error);
    return axiosError.response?.data;
  }
};
