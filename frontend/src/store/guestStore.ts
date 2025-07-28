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
  invitationSiteId: string
  createdAt: string
  updatedAt: string
}

interface GuestState {
  guests: Guest[]
  currentGuest: Guest | null
  isLoading: boolean
  error: string | null
  
  // Actions
  fetchGuests: () => Promise<void>
  fetchGuest: (id: string) => Promise<void>
  createGuest: (data: Partial<Guest>) => Promise<Guest>
  updateGuest: (id: string, data: Partial<Guest>) => Promise<void>
  deleteGuest: (id: string) => Promise<void>
  setCurrentGuest: (guest: Guest | null) => void
  clearError: () => void
}

export const useGuestStore = create<GuestState>((set, get) => ({
  guests: [],
  currentGuest: null,
  isLoading: false,
  error: null,

  fetchGuests: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await api.get('/guests')
      set({ guests: response.data, isLoading: false })
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Ошибка загрузки гостей',
        isLoading: false 
      })
    }
  },

  fetchGuest: async (id: string) => {
    set({ isLoading: true, error: null })
    try {
      const response = await api.get(`/guests/${id}`)
      set({ currentGuest: response.data, isLoading: false })
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Ошибка загрузки гостя',
        isLoading: false 
      })
    }
  },

  createGuest: async (data: Partial<Guest>) => {
    set({ isLoading: true, error: null })
    try {
      const response = await api.post('/guests', data)
      const newGuest = response.data
      set(state => ({
        guests: [...state.guests, newGuest],
        currentGuest: newGuest,
        isLoading: false
      }))
      return newGuest
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Ошибка создания гостя',
        isLoading: false 
      })
      throw error
    }
  },

  updateGuest: async (id: string, data: Partial<Guest>) => {
    set({ isLoading: true, error: null })
    try {
      const response = await api.put(`/guests/${id}`, data)
      const updatedGuest = response.data
      set(state => ({
        guests: state.guests.map(guest => 
          guest.id === id ? updatedGuest : guest
        ),
        currentGuest: state.currentGuest?.id === id 
          ? updatedGuest 
          : state.currentGuest,
        isLoading: false
      }))
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Ошибка обновления гостя',
        isLoading: false 
      })
      throw error
    }
  },

  deleteGuest: async (id: string) => {
    set({ isLoading: true, error: null })
    try {
      await api.delete(`/guests/${id}`)
      set(state => ({
        guests: state.guests.filter(guest => guest.id !== id),
        currentGuest: state.currentGuest?.id === id 
          ? null 
          : state.currentGuest,
        isLoading: false
      }))
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Ошибка удаления гостя',
        isLoading: false 
      })
      throw error
    }
  },

  setCurrentGuest: (guest: Guest | null) => {
    set({ currentGuest: guest })
  },

  clearError: () => {
    set({ error: null })
  },
})) 