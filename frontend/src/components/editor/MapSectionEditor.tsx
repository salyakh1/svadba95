'use client'

import { useState, useRef } from 'react'
import { MapPin, Upload, X, Settings, Image as ImageIcon, Search } from 'lucide-react'
import { MapSectionConfig } from '@/types'
import { geocodeAddress } from '@/lib/geocoding'
import toast from 'react-hot-toast'

interface MapSectionEditorProps {
  config: MapSectionConfig
  onConfigChange: (config: MapSectionConfig) => void
}

export default function MapSectionEditor({ config, onConfigChange }: MapSectionEditorProps) {
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleConfigChange = (updates: Partial<MapSectionConfig>) => {
    onConfigChange({ ...config, ...updates })
  }

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    try {
      // Здесь будет загрузка файла на сервер
      // Пока используем временный URL
      const url = URL.createObjectURL(file)
      
      handleConfigChange({
        restaurantPhoto: {
          url,
          size: 75, // По умолчанию 75%
          enabled: true,
        }
      })
    } catch (error) {
      console.error('Ошибка загрузки фото:', error)
    } finally {
      setIsUploading(false)
    }
  }

  const removePhoto = () => {
    handleConfigChange({
      restaurantPhoto: {
        url: '',
        size: 75,
        enabled: false,
      }
    })
  }

  const handleSizeChange = (size: number) => {
    if (config.restaurantPhoto) {
      handleConfigChange({
        restaurantPhoto: {
          ...config.restaurantPhoto,
          size,
        }
      })
    }
  }

  const handleGeocodeAddress = async () => {
    if (!config.address) {
      toast.error('Сначала введите адрес')
      return
    }

    try {
      const result = await geocodeAddress(config.address)
      if (result) {
        handleConfigChange({
          coordinates: {
            lat: result.lat,
            lng: result.lng
          }
        })
        toast.success('Координаты получены автоматически')
      } else {
        toast.error('Не удалось получить координаты')
      }
    } catch (error) {
      toast.error('Ошибка при получении координат')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <MapPin className="h-5 w-5 text-primary-600" />
        <h3 className="text-lg font-semibold">Настройки карты</h3>
      </div>

      {/* Основные настройки */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Название места проведения
          </label>
          <input
            type="text"
            value={config.venueName}
            onChange={(e) => handleConfigChange({ venueName: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Ресторан 'У Моря'"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Адрес
          </label>
          <input
            type="text"
            value={config.address}
            onChange={(e) => handleConfigChange({ address: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="ул. Пушкина, 10, Москва"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={handleGeocodeAddress}
              className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
            >
              <Search className="h-4 w-4" />
              <span>Получить координаты по адресу</span>
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Широта
              </label>
              <input
                type="number"
                step="any"
                value={config.coordinates.lat}
                onChange={(e) => handleConfigChange({
                  coordinates: {
                    ...config.coordinates,
                    lat: parseFloat(e.target.value) || 0
                  }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Долгота
              </label>
              <input
                type="number"
                step="any"
                value={config.coordinates.lng}
                onChange={(e) => handleConfigChange({
                  coordinates: {
                    ...config.coordinates,
                    lng: parseFloat(e.target.value) || 0
                  }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Настройки фото ресторана */}
      <div className="border-t pt-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-md font-medium text-gray-900">Фото ресторана</h4>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={config.restaurantPhoto?.enabled || false}
              onChange={(e) => handleConfigChange({
                restaurantPhoto: {
                  ...config.restaurantPhoto,
                  enabled: e.target.checked,
                }
              })}
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm text-gray-700">Показать фото</span>
          </label>
        </div>

        {config.restaurantPhoto?.enabled && (
          <div className="space-y-4">
            {/* Загрузка фото */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Загрузить фото ресторана
              </label>
              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50"
                >
                  <Upload className="h-4 w-4" />
                  <span>{isUploading ? 'Загрузка...' : 'Выбрать фото'}</span>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                {config.restaurantPhoto?.url && (
                  <button
                    type="button"
                    onClick={removePhoto}
                    className="flex items-center space-x-2 px-3 py-2 text-red-600 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                    <span>Удалить</span>
                  </button>
                )}
              </div>
            </div>

            {/* Предпросмотр фото */}
            {config.restaurantPhoto?.url && (
              <div className="border rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <ImageIcon className="h-4 w-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">Предпросмотр</span>
                </div>
                <div className="flex justify-center">
                  <img
                    src={config.restaurantPhoto.url}
                    alt="Фото ресторана"
                    className="max-w-full h-auto rounded-lg"
                    style={{
                      width: `${config.restaurantPhoto.size}%`,
                      maxWidth: '300px'
                    }}
                  />
                </div>
              </div>
            )}

            {/* Регулятор размера */}
            {config.restaurantPhoto?.url && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Размер фото: {config.restaurantPhoto.size}%
                </label>
                <input
                  type="range"
                  min="50"
                  max="100"
                  value={config.restaurantPhoto.size}
                  onChange={(e) => handleSizeChange(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Настройки подсказки */}
      <div className="border-t pt-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-md font-medium text-gray-900">Подсказка о навигации</h4>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={config.showDirectionsHint}
              onChange={(e) => handleConfigChange({ showDirectionsHint: e.target.checked })}
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm text-gray-700">Показать подсказку</span>
          </label>
        </div>

        {config.showDirectionsHint && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Текст подсказки
            </label>
            <input
              type="text"
              value={config.directionsHintText}
              onChange={(e) => handleConfigChange({ directionsHintText: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Нажмите на карту, чтобы построить маршрут"
            />
          </div>
        )}
      </div>
    </div>
  )
} 