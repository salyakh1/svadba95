import { create } from 'zustand'
import { api } from '@/lib/api'

export interface Guest {
  id: string
  name: string
  email?: string
  phone?: string
  rsvp?: 'yes' | 'no' | 'maybe'
  plusOne?: boolean
  plusOneName?: string
  createdAt: string
  updatedAt: string
}

export interface InvitationSite {
  id: string
  title: string
  description?: string
  eventDate: string
  eventTime: string
  venue: string
  venueAddress: string
  dressCode?: string
  additionalInfo?: string
  backgroundImage?: string
  primaryColor: string
  secondaryColor: string
  fontFamily: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface Invitation {
  id: string
  title: string
  description?: string
  templateId: string
  status: 'draft' | 'active' | 'archived'
  guests?: Guest[]
  invitationSite?: InvitationSite
  createdAt: string
  updatedAt: string
}

interface InvitationState {
  invitations: Invitation[]
  currentInvitation: Invitation | null
  isLoading: boolean
  error: string | null
  
  // Actions
  fetchInvitations: () => Promise<void>
  fetchInvitation: (id: string) => Promise<void>
  createInvitation: (data: Partial<Invitation>) => Promise<Invitation>
  updateInvitation: (id: string, data: Partial<Invitation>) => Promise<void>
  deleteInvitation: (id: string) => Promise<void>
  setCurrentInvitation: (invitation: Invitation | null) => void
  clearError: () => void
}

export const useInvitationStore = create<InvitationState>((set, get) => ({
  invitations: [],
  currentInvitation: null,
  isLoading: false,
  error: null,

  fetchInvitations: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await api.get('/invitation-sites')
      set({ invitations: response.data, isLoading: false })
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Ошибка загрузки приглашений',
        isLoading: false 
      })
    }
  },

  fetchInvitation: async (id: string) => {
    set({ isLoading: true, error: null })
    try {
      const response = await api.get(`/invitation-sites/${id}`)
      set({ currentInvitation: response.data, isLoading: false })
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Ошибка загрузки приглашения',
        isLoading: false 
      })
    }
  },

  createInvitation: async (data: Partial<Invitation>) => {
    set({ isLoading: true, error: null })
    try {
      const response = await api.post('/invitation-sites', data)
      const newInvitation = response.data
      set(state => ({
        invitations: [...state.invitations, newInvitation],
        currentInvitation: newInvitation,
        isLoading: false
      }))
      return newInvitation
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Ошибка создания приглашения',
        isLoading: false 
      })
      throw error
    }
  },

  updateInvitation: async (id: string, data: Partial<Invitation>) => {
    set({ isLoading: true, error: null })
    try {
      const response = await api.put(`/invitation-sites/${id}`, data)
      const updatedInvitation = response.data
      set(state => ({
        invitations: state.invitations.map(inv => 
          inv.id === id ? updatedInvitation : inv
        ),
        currentInvitation: state.currentInvitation?.id === id 
          ? updatedInvitation 
          : state.currentInvitation,
        isLoading: false
      }))
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Ошибка обновления приглашения',
        isLoading: false 
      })
      throw error
    }
  },

  deleteInvitation: async (id: string) => {
    set({ isLoading: true, error: null })
    try {
      await api.delete(`/invitation-sites/${id}`)
      set(state => ({
        invitations: state.invitations.filter(inv => inv.id !== id),
        currentInvitation: state.currentInvitation?.id === id 
          ? null 
          : state.currentInvitation,
        isLoading: false
      }))
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Ошибка удаления приглашения',
        isLoading: false 
      })
      throw error
    }
  },

  setCurrentInvitation: (invitation: Invitation | null) => {
    set({ currentInvitation: invitation })
  },

  clearError: () => {
    set({ error: null })
  },
})) 