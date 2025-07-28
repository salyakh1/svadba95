import { create } from 'zustand'
import { api } from '@/lib/api'

export interface Template {
  id: string
  name: string
  description?: string
  category: 'classic' | 'modern' | 'romantic' | 'minimalist' | 'vintage'
  previewImage: string
  templateData: any
  likes: number
  isPremium: boolean
  price?: number
  createdAt: string
  updatedAt: string
}

interface TemplateState {
  templates: Template[]
  currentTemplate: Template | null
  isLoading: boolean
  error: string | null
  
  // Actions
  fetchTemplates: () => Promise<void>
  fetchTemplate: (id: string) => Promise<void>
  likeTemplate: (id: string) => Promise<void>
  clearError: () => void
}

export const useTemplateStore = create<TemplateState>((set, get) => ({
  templates: [],
  currentTemplate: null,
  isLoading: false,
  error: null,

  fetchTemplates: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await api.get('/templates')
      set({ templates: response.data, isLoading: false })
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Ошибка загрузки шаблонов',
        isLoading: false 
      })
    }
  },

  fetchTemplate: async (id: string) => {
    set({ isLoading: true, error: null })
    try {
      const response = await api.get(`/templates/${id}`)
      set({ currentTemplate: response.data, isLoading: false })
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Ошибка загрузки шаблона',
        isLoading: false 
      })
    }
  },

  likeTemplate: async (id: string) => {
    try {
      await api.post(`/templates/${id}/like`)
      set(state => ({
        templates: state.templates.map(template => 
          template.id === id 
            ? { ...template, likes: template.likes + 1 }
            : template
        ),
        currentTemplate: state.currentTemplate?.id === id 
          ? { ...state.currentTemplate, likes: state.currentTemplate.likes + 1 }
          : state.currentTemplate
      }))
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Ошибка лайка шаблона'
      })
    }
  },

  clearError: () => {
    set({ error: null })
  },
})) 