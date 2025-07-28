// API Response типы
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Аутентификация
export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}

// Шаблоны
export interface Template {
  id: string;
  name: string;
  description?: string;
  previewUrl: string;
  configJson: TemplateConfig;
  isPremium: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
}

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
      type: 'header' | 'content' | 'gallery' | 'rsvp' | 'footer' | 'map';
      config: Record<string, any>;
    }>;
  };
  animations: {
    enabled: boolean;
    type: 'fade' | 'slide' | 'zoom';
  };
}

// Конфигурация блока карты
export interface MapSectionConfig {
  enabled: boolean;
  coordinates: {
    lat: number;
    lng: number;
  };
  venueName: string;
  address: string;
  restaurantPhoto?: {
    url: string;
    size: number; // Размер в процентах (50-100)
    enabled: boolean;
  };
  showDirectionsHint: boolean;
  directionsHintText: string;
}

// Сайты приглашений
export interface InvitationSite {
  id: string;
  userId: string;
  templateId: string;
  title: string;
  slug: string;
  configJson: TemplateConfig;
  rsvpConfigJson?: RSVPConfig;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  isPublished: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  template?: Template;
  guests?: Guest[];
}

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

// RSVP и гости
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

export interface Guest {
  id: string;
  invitationSiteId: string;
  name: string;
  email?: string;
  phone?: string;
  rsvpStatus: 'PENDING' | 'CONFIRMED' | 'DECLINED' | 'MAYBE';
  mealPreference?: string;
  tableNumber?: number;
  notes?: string;
  respondedAt?: string;
  createdAt: string;
  updatedAt: string;
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

// PDF и рассылка
export interface PDFGenerationRequest {
  invitationSiteId: string;
  includeQR: boolean;
  format: 'A4' | 'A5' | 'letter';
  orientation: 'portrait' | 'landscape';
}

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

// Статистика
export interface RSVPStats {
  stats: Array<{
    rsvpStatus: string;
    _count: {
      rsvpStatus: number;
    };
  }>;
  totalGuests: number;
  respondedGuests: number;
  responseRate: number;
}

// Банкетные карточки
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

// Zustand Store типы
export interface AuthStore {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

export interface TemplateStore {
  templates: Template[];
  selectedTemplate: Template | null;
  isLoading: boolean;
  fetchTemplates: () => Promise<void>;
  selectTemplate: (template: Template) => void;
  clearSelection: () => void;
}

export interface InvitationSiteStore {
  sites: InvitationSite[];
  currentSite: InvitationSite | null;
  isLoading: boolean;
  fetchUserSites: () => Promise<void>;
  createSite: (data: CreateInvitationSiteRequest) => Promise<InvitationSite>;
  updateSite: (id: string, data: UpdateInvitationSiteRequest) => Promise<void>;
  deleteSite: (id: string) => Promise<void>;
  setCurrentSite: (site: InvitationSite | null) => void;
}

export interface GuestStore {
  guests: Guest[];
  isLoading: boolean;
  fetchGuests: (invitationSiteId: string) => Promise<void>;
  addGuests: (invitationSiteId: string, guests: GuestRequest[]) => Promise<void>;
  updateGuest: (guestId: string, data: Partial<Guest>) => Promise<void>;
  deleteGuest: (guestId: string) => Promise<void>;
  submitRSVP: (guestId: string, data: RSVPRequest) => Promise<void>;
  getRSVPStats: (invitationSiteId: string) => Promise<RSVPStats>;
}

// Заказы
export interface Order {
  id: string;
  userId: string;
  invitationSiteId: string;
  orderNumber: string;
  status: 'PENDING' | 'CONFIRMED' | 'IN_PRODUCTION' | 'READY' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  totalAmount: number;
  currency: string;
  paymentMethod?: 'CARD' | 'CASH' | 'BANK_TRANSFER' | 'ELECTRONIC';
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';
  customerInfo?: Record<string, any>;
  deliveryInfo?: Record<string, any>;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  orderItems: OrderItem[];
  invitationSite?: {
    id: string;
    title: string;
    slug: string;
  };
}

export interface OrderItem {
  id: string;
  orderId: string;
  productType: 'INVITATION_PRINT' | 'INVITATION_DIGITAL' | 'BANQUET_CARDS' | 'THANK_YOU_CARDS' | 'ENVELOPES' | 'STAMPS' | 'DELIVERY' | 'PREMIUM_TEMPLATE' | 'SMS_SERVICE' | 'EMAIL_SERVICE';
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  description?: string;
  createdAt: string;
}

export interface CreateOrderRequest {
  invitationSiteId: string;
  totalAmount: number;
  currency?: string;
  paymentMethod?: string;
  customerInfo?: Record<string, any>;
  deliveryInfo?: Record<string, any>;
  notes?: string;
  items: Array<{
    productType: string;
    quantity: number;
    unitPrice: number;
    description?: string;
  }>;
}

export interface OrderStats {
  stats: Array<{
    status: string;
    _count: {
      status: number;
    };
    _sum: {
      totalAmount: number;
    };
  }>;
  totalOrders: number;
  totalRevenue: number;
}

export interface OrderStore {
  orders: Order[];
  currentOrder: Order | null;
  isLoading: boolean;
  fetchOrders: () => Promise<void>;
  createOrder: (data: CreateOrderRequest) => Promise<Order>;
  getOrderById: (id: string) => Promise<Order>;
  updateOrderStatus: (id: string, status: string, paymentStatus?: string) => Promise<void>;
  cancelOrder: (id: string) => Promise<void>;
  getOrderStats: () => Promise<OrderStats>;
  setCurrentOrder: (order: Order | null) => void;
} 