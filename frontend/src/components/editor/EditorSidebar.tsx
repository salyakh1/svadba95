'use client'

import { useState } from 'react'
import { Palette, Type, Image, Calendar, MapPin, Users } from 'lucide-react'

interface EditorSidebarProps {
  data: any
  onChange: (data: any) => void
}

export default function EditorSidebar({ data, onChange }: EditorSidebarProps) {
  const [activeTab, setActiveTab] = useState('content')

  const tabs = [
    { id: 'content', name: 'Контент', icon: Type },
    { id: 'design', name: 'Дизайн', icon: Palette },
    { id: 'images', name: 'Изображения', icon: Image },
    { id: 'details', name: 'Детали', icon: Calendar },
  ]

  const handleChange = (field: string, value: any) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <div className="h-full flex flex-col">
      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center px-3 py-3 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'text-primary-600 border-b-2 border-primary-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <tab.icon className="h-4 w-4 mr-2" />
            {tab.name}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'content' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Заголовок
              </label>
              <input
                type="text"
                value={data?.title || ''}
                onChange={(e) => handleChange('title', e.target.value)}
                className="input w-full"
                placeholder="Свадебное приглашение"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Описание
              </label>
              <textarea
                value={data?.description || ''}
                onChange={(e) => handleChange('description', e.target.value)}
                className="input w-full h-20"
                placeholder="Приглашаем вас на нашу свадьбу"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Дополнительная информация
              </label>
              <textarea
                value={data?.additionalInfo || ''}
                onChange={(e) => handleChange('additionalInfo', e.target.value)}
                className="input w-full h-20"
                placeholder="Дополнительная информация для гостей"
              />
            </div>
          </div>
        )}

        {activeTab === 'design' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Основной цвет
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={data?.primaryColor || '#8B5CF6'}
                  onChange={(e) => handleChange('primaryColor', e.target.value)}
                  className="w-12 h-10 rounded border border-gray-300"
                />
                <input
                  type="text"
                  value={data?.primaryColor || '#8B5CF6'}
                  onChange={(e) => handleChange('primaryColor', e.target.value)}
                  className="input flex-1"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Дополнительный цвет
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={data?.secondaryColor || '#EC4899'}
                  onChange={(e) => handleChange('secondaryColor', e.target.value)}
                  className="w-12 h-10 rounded border border-gray-300"
                />
                <input
                  type="text"
                  value={data?.secondaryColor || '#EC4899'}
                  onChange={(e) => handleChange('secondaryColor', e.target.value)}
                  className="input flex-1"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Шрифт
              </label>
              <select
                value={data?.fontFamily || 'Inter'}
                onChange={(e) => handleChange('fontFamily', e.target.value)}
                className="input w-full"
              >
                <option value="Inter">Inter</option>
                <option value="Playfair Display">Playfair Display</option>
                <option value="Roboto">Roboto</option>
                <option value="Open Sans">Open Sans</option>
                <option value="Lora">Lora</option>
              </select>
            </div>
          </div>
        )}

        {activeTab === 'images' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Фоновое изображение
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Image className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-2">
                  Перетащите изображение сюда или нажмите для выбора
                </p>
                <button className="btn-secondary text-sm">
                  Выбрать файл
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'details' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Дата события
              </label>
              <input
                type="date"
                value={data?.eventDate || ''}
                onChange={(e) => handleChange('eventDate', e.target.value)}
                className="input w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Время события
              </label>
              <input
                type="time"
                value={data?.eventTime || ''}
                onChange={(e) => handleChange('eventTime', e.target.value)}
                className="input w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Место проведения
              </label>
              <input
                type="text"
                value={data?.venue || ''}
                onChange={(e) => handleChange('venue', e.target.value)}
                className="input w-full"
                placeholder="Название места"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Адрес
              </label>
              <textarea
                value={data?.venueAddress || ''}
                onChange={(e) => handleChange('venueAddress', e.target.value)}
                className="input w-full h-16"
                placeholder="Полный адрес места проведения"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Дресс-код
              </label>
              <input
                type="text"
                value={data?.dressCode || ''}
                onChange={(e) => handleChange('dressCode', e.target.value)}
                className="input w-full"
                placeholder="Например: Вечерний наряд"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 