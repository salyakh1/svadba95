import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { ApiResponse } from '@/types';

// Создание экземпляра axios
const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Интерцептор для добавления токена
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Интерцептор для обработки ответов
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Удаляем токен при ошибке авторизации
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API методы
export const authAPI = {
  register: async (data: any): Promise<ApiResponse> => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  login: async (data: any): Promise<ApiResponse> => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },

  getCurrentUser: async (): Promise<ApiResponse> => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  updateProfile: async (data: any): Promise<ApiResponse> => {
    const response = await api.put('/auth/profile', data);
    return response.data;
  },
};

export const templateAPI = {
  getAll: async (): Promise<ApiResponse> => {
    const response = await api.get('/templates');
    return response.data;
  },

  getById: async (id: string): Promise<ApiResponse> => {
    const response = await api.get(`/templates/${id}`);
    return response.data;
  },
};

export const invitationSiteAPI = {
  create: async (data: any): Promise<ApiResponse> => {
    const response = await api.post('/invitation-sites', data);
    return response.data;
  },

  getUserSites: async (): Promise<ApiResponse> => {
    const response = await api.get('/invitation-sites/user');
    return response.data;
  },

  getBySlug: async (slug: string): Promise<ApiResponse> => {
    const response = await api.get(`/invitation-sites/public/${slug}`);
    return response.data;
  },

  update: async (id: string, data: any): Promise<ApiResponse> => {
    const response = await api.put(`/invitation-sites/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<ApiResponse> => {
    const response = await api.delete(`/invitation-sites/${id}`);
    return response.data;
  },

  publish: async (id: string): Promise<ApiResponse> => {
    const response = await api.post(`/invitation-sites/${id}/publish`);
    return response.data;
  },

  getQRCode: async (id: string): Promise<ApiResponse> => {
    const response = await api.get(`/invitation-sites/${id}/qr`);
    return response.data;
  },
};

export const guestAPI = {
  addGuests: async (data: any): Promise<ApiResponse> => {
    const response = await api.post('/guests', data);
    return response.data;
  },

  getByInvitationSite: async (invitationSiteId: string): Promise<ApiResponse> => {
    const response = await api.get(`/guests/${invitationSiteId}`);
    return response.data;
  },

  submitRSVP: async (guestId: string, data: any): Promise<ApiResponse> => {
    const response = await api.post(`/guests/rsvp/${guestId}`, data);
    return response.data;
  },

  getRSVPStats: async (invitationSiteId: string): Promise<ApiResponse> => {
    const response = await api.get(`/guests/stats/${invitationSiteId}`);
    return response.data;
  },

  update: async (guestId: string, data: any): Promise<ApiResponse> => {
    const response = await api.put(`/guests/${guestId}`, data);
    return response.data;
  },

  delete: async (guestId: string): Promise<ApiResponse> => {
    const response = await api.delete(`/guests/${guestId}`);
    return response.data;
  },
};

export const pdfAPI = {
  generateInvitation: async (data: any): Promise<Blob> => {
    const response = await api.post('/generate-pdf', data, {
      responseType: 'blob',
    });
    return response.data;
  },

  generateBanquetCards: async (invitationSiteId: string): Promise<Blob> => {
    const response = await api.get(`/banquet-cards/${invitationSiteId}`, {
      responseType: 'blob',
    });
    return response.data;
  },
};

export const emailAPI = {
  sendInvites: async (data: any): Promise<ApiResponse> => {
    const response = await api.post('/send-invites', data);
    return response.data;
  },
};

export const orderAPI = {
  createOrder: async (data: any): Promise<ApiResponse> => {
    const response = await api.post('/orders', data);
    return response.data;
  },

  getUserOrders: async (): Promise<ApiResponse> => {
    const response = await api.get('/orders');
    return response.data;
  },

  getOrderById: async (id: string): Promise<ApiResponse> => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },

  updateOrderStatus: async (id: string, data: any): Promise<ApiResponse> => {
    const response = await api.patch(`/orders/${id}/status`, data);
    return response.data;
  },

  cancelOrder: async (id: string): Promise<ApiResponse> => {
    const response = await api.delete(`/orders/${id}`);
    return response.data;
  },

  getOrderStats: async (): Promise<ApiResponse> => {
    const response = await api.get('/orders/stats');
    return response.data;
  },
};

export default api;
export { api }; 