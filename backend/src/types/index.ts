import { Request } from 'express';

// Расширенный Request с пользователем
export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
  };
}

// Типы для аутентификации
export interface RegisterRequest {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
  };
  token: string;
}

// Типы для шаблонов
export interface TemplateConfig {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  fonts: {
    heading: string;
    body: string;
    accent: string;
  };
  layout: {
    type: 'classic' | 'modern' | 'minimal' | 'elegant';
    sections: Array<{
      id: string;
      type: 'header' | 'content' | 'gallery' | 'rsvp' | 'footer';
      config: Record<string, any>;
    }>;
  };
  animations: {
    enabled: boolean;
    type: 'fade' | 'slide' | 'zoom';
  };
}

// Типы для сайтов приглашений
export interface CreateInvitationSiteRequest {
  templateId: string;
  title: string;
  slug: string;
  configJson: TemplateConfig;
  rsvpConfigJson?: RSVPConfig;
}

export interface UpdateInvitationSiteRequest {
  title?: string;
  configJson?: TemplateConfig;
  rsvpConfigJson?: RSVPConfig;
  status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
}

// Типы для RSVP
export interface RSVPConfig {
  enabled: boolean;
  requireMealPreference: boolean;
  mealOptions: string[];
  requireTableNumber: boolean;
  allowNotes: boolean;
  customFields: Array<{
    name: string;
    type: 'text' | 'select' | 'checkbox';
    required: boolean;
    options?: string[];
  }>;
}

export interface GuestRequest {
  invitationSiteId: string;
  name: string;
  email?: string;
  phone?: string;
}

export interface RSVPRequest {
  status: 'CONFIRMED' | 'DECLINED' | 'MAYBE';
  mealPreference?: string;
  tableNumber?: number;
  notes?: string;
}

// Типы для PDF
export interface PDFGenerationRequest {
  invitationSiteId: string;
  includeQR: boolean;
  format: 'A4' | 'A5' | 'letter';
  orientation: 'portrait' | 'landscape';
}

// Типы для рассылки
export interface SendInvitesRequest {
  invitationSiteId: string;
  guests: Array<{
    name: string;
    email?: string;
    phone?: string;
  }>;
  sendEmail: boolean;
  sendSMS: boolean;
  customMessage?: string;
}

// Типы для банкетных карточек
export interface BanquetCardData {
  guests: Array<{
    name: string;
    tableNumber: number;
    mealPreference?: string;
    notes?: string;
  }>;
  tables: Array<{
    number: number;
    capacity: number;
    guests: string[];
  }>;
  eventDetails: {
    title: string;
    date: string;
    time: string;
    venue: string;
  };
}

// API Response типы
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Error типы
export interface AppError extends Error {
  statusCode: number;
  isOperational: boolean;
}

// File upload типы
export interface FileUploadConfig {
  maxSize: number;
  allowedTypes: string[];
  uploadPath: string;
}

// Email/SMS типы
export interface EmailConfig {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export interface SMSConfig {
  to: string;
  message: string;
} 