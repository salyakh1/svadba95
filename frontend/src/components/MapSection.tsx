'use client'

import { MapPin, Navigation } from 'lucide-react'
import { MapSectionConfig } from '@/types'

interface MapSectionProps {
  config: MapSectionConfig
}

export default function MapSection({ config }: MapSectionProps) {
  const handleMapClick = () => {
    // Открываем навигацию в Google Maps
    const { lat, lng } = config.coordinates
    const venueName = encodeURIComponent(config.venueName)
    const address = encodeURIComponent(config.address)
    
    // Создаем URL для навигации
    const navigationUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&destination_place_id=${venueName}`
    
    // Открываем в новой вкладке
    window.open(navigationUrl, '_blank')
  }

  if (!config.enabled) {
    return null
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Заголовок */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Место проведения
            </h2>
            <div className="flex items-center justify-center space-x-2 text-gray-600">
              <MapPin className="h-5 w-5" />
              <span className="text-lg">{config.venueName}</span>
            </div>
            <p className="text-gray-600 mt-2">{config.address}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Фото ресторана (если включено) */}
            {config.restaurantPhoto?.enabled && config.restaurantPhoto?.url && (
              <div className="order-1 md:order-1">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <img
                    src={config.restaurantPhoto.url}
                    alt={`Фото ${config.venueName}`}
                    className="w-full h-auto object-cover"
                    style={{
                      width: `${config.restaurantPhoto.size}%`,
                      maxWidth: '100%'
                    }}
                  />
                </div>
              </div>
            )}

            {/* Карта */}
            <div className={`order-2 ${config.restaurantPhoto?.enabled ? 'md:order-2' : 'md:col-span-2'}`}>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Заголовок карты */}
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {config.venueName}
                  </h3>
                  <p className="text-gray-600 text-sm">{config.address}</p>
                </div>

                {/* Интерактивная карта */}
                <div 
                  className="relative cursor-pointer group"
                  onClick={handleMapClick}
                >
                  {/* Заглушка карты (в реальном проекте здесь будет Google Maps или Яндекс.Карты) */}
                  <div className="h-64 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                      <p className="text-blue-800 font-medium">Интерактивная карта</p>
                      <p className="text-blue-600 text-sm mt-2">Нажмите для открытия навигации</p>
                    </div>
                  </div>

                  {/* Overlay с подсказкой */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200 flex items-center justify-center">
                    <div className="bg-white bg-opacity-90 rounded-lg px-4 py-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <div className="flex items-center space-x-2">
                        <Navigation className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium text-gray-900">
                          Открыть навигацию
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Подсказка о навигации */}
                {config.showDirectionsHint && (
                  <div className="p-4 bg-blue-50 border-t border-blue-100">
                    <div className="flex items-center space-x-2">
                      <Navigation className="h-4 w-4 text-blue-600" />
                      <p className="text-sm text-blue-800">
                        {config.directionsHintText || "Нажмите на карту, чтобы построить маршрут"}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Дополнительная информация */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center space-x-2 bg-white rounded-full px-6 py-3 shadow-md">
              <MapPin className="h-5 w-5 text-primary-600" />
              <span className="text-gray-700 font-medium">
                Координаты: {config.coordinates.lat.toFixed(6)}, {config.coordinates.lng.toFixed(6)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 