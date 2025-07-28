import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthStore, User, LoginRequest, RegisterRequest } from '@/types';
import { authAPI } from '@/lib/api';
import toast from 'react-hot-toast';

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      isAuthenticated: false,

      login: async (credentials: LoginRequest) => {
        set({ isLoading: true });
        try {
          const response = await authAPI.login(credentials);
          if (response.success && response.data) {
            const { user, token } = response.data;
            set({
              user,
              token,
              isAuthenticated: true,
              isLoading: false,
            });
            localStorage.setItem('token', token);
            toast.success('Вход выполнен успешно!');
          } else {
            throw new Error(response.error || 'Ошибка входа');
          }
        } catch (error: any) {
          set({ isLoading: false });
          toast.error(error.response?.data?.error || 'Ошибка входа');
          throw error;
        }
      },

      register: async (data: RegisterRequest) => {
        set({ isLoading: true });
        try {
          const response = await authAPI.register(data);
          if (response.success && response.data) {
            const { user, token } = response.data;
            set({
              user,
              token,
              isAuthenticated: true,
              isLoading: false,
            });
            localStorage.setItem('token', token);
            toast.success('Регистрация выполнена успешно!');
          } else {
            throw new Error(response.error || 'Ошибка регистрации');
          }
        } catch (error: any) {
          set({ isLoading: false });
          toast.error(error.response?.data?.error || 'Ошибка регистрации');
          throw error;
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
        localStorage.removeItem('token');
        toast.success('Выход выполнен успешно');
      },

      setUser: (user: User) => {
        set({ user, isAuthenticated: true });
      },

      setToken: (token: string) => {
        set({ token, isAuthenticated: true });
        localStorage.setItem('token', token);
      },

      updateProfile: async (data: Partial<User>) => {
        set({ isLoading: true });
        try {
          const response = await authAPI.updateProfile(data);
          if (response.success && response.data) {
            set({ user: response.data, isLoading: false });
            toast.success('Профиль обновлен успешно!');
          } else {
            throw new Error(response.error || 'Ошибка обновления профиля');
          }
        } catch (error: any) {
          set({ isLoading: false });
          toast.error(error.response?.data?.error || 'Ошибка обновления профиля');
          throw error;
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
); 