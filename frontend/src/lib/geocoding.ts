// Утилита для геокодинга адресов
export interface GeocodingResult {
  lat: number;
  lng: number;
  formattedAddress: string;
}

// Простая функция для получения координат по адресу
// В реальном проекте здесь будет интеграция с Google Maps API или Яндекс.Карты API
export async function geocodeAddress(address: string): Promise<GeocodingResult | null> {
  try {
    // Здесь будет реальный API вызов
    // Пока возвращаем заглушку для демонстрации
    // console.log('Геокодинг адреса:', address)
    
    // Пример координат для Москвы
    return {
      lat: 55.7558,
      lng: 37.6176,
      formattedAddress: address
    }
  } catch (error) {
    console.error('Ошибка геокодинга:', error)
    return null
  }
}

// Функция для валидации координат
export function validateCoordinates(lat: number, lng: number): boolean {
  return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180
}

// Функция для форматирования координат
export function formatCoordinates(lat: number, lng: number): string {
  return `${lat.toFixed(6)}, ${lng.toFixed(6)}`
}

// Функция для создания URL навигации
export function createNavigationUrl(lat: number, lng: number, venueName?: string): string {
  const encodedName = venueName ? encodeURIComponent(venueName) : ''
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&destination_place_id=${encodedName}`
}

// Функция для создания URL просмотра карты
export function createMapUrl(lat: number, lng: number, venueName?: string): string {
  const encodedName = venueName ? encodeURIComponent(venueName) : ''
  return `https://www.google.com/maps?q=${lat},${lng}&z=15&t=m&q=${encodedName}`
} 