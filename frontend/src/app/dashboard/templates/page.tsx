'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { useTemplateStore } from '@/store/templateStore'
import DashboardLayout from '@/components/layouts/DashboardLayout'
import { Search, Filter, Heart, Eye, ArrowRight } from 'lucide-react'

export default function TemplatesPage() {
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()
  const { templates, fetchTemplates, isLoading } = useTemplateStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
      return
    }

    fetchTemplates()
  }, [isAuthenticated, router, fetchTemplates])

  const categories = [
    { id: 'all', name: 'Все шаблоны' },
    { id: 'classic', name: 'Классические' },
    { id: 'modern', name: 'Современные' },
    { id: 'romantic', name: 'Романтичные' },
    { id: 'minimalist', name: 'Минималистичные' },
    { id: 'vintage', name: 'Винтажные' },
  ]

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleSelectTemplate = (templateId: string) => {
    router.push(`/dashboard/editor/new?template=${templateId}`)
  }

  const handlePreviewTemplate = (templateId: string) => {
    router.push(`/dashboard/templates/${templateId}/preview`)
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Шаблоны приглашений</h1>
            <p className="text-gray-600 mt-2">
              Выберите красивый шаблон для вашего свадебного приглашения
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск шаблонов..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-10 w-full"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Templates Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                className="card hover:shadow-lg transition-all duration-300 group"
              >
                <div className="relative">
                  <img
                    src={template.previewImage}
                    alt={template.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-t-lg" />
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => handlePreviewTemplate(template.id)}
                      className="p-2 bg-white bg-opacity-90 rounded-full shadow-md hover:bg-opacity-100 transition-all"
                      title="Предварительный просмотр"
                    >
                      <Eye className="h-4 w-4 text-gray-700" />
                    </button>
                  </div>
                </div>
                
                <div className="card-body">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {template.name}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {template.description}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <Heart className="h-4 w-4" />
                      <span>{template.likes || 0}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        template.category === 'classic' ? 'bg-blue-100 text-blue-800' :
                        template.category === 'modern' ? 'bg-green-100 text-green-800' :
                        template.category === 'romantic' ? 'bg-pink-100 text-pink-800' :
                        template.category === 'minimalist' ? 'bg-gray-100 text-gray-800' :
                        template.category === 'vintage' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {categories.find(c => c.id === template.category)?.name || template.category}
                      </span>
                    </div>
                    
                    <button
                      onClick={() => handleSelectTemplate(template.id)}
                      className="btn-primary flex items-center space-x-1 text-sm"
                    >
                      <span>Выбрать</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Шаблоны не найдены
            </h3>
            <p className="text-gray-600">
              Попробуйте изменить параметры поиска или фильтры
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
} 