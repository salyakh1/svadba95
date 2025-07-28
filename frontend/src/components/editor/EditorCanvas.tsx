'use client'

import { useEffect, useRef } from 'react'
import { Template } from '@/store/templateStore'

interface EditorCanvasProps {
  template: Template | null
  data: any
  onChange: (data: any) => void
}

export default function EditorCanvas({ template, data, onChange }: EditorCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!template || !data) return

    // Здесь будет логика рендеринга шаблона
    // В реальном приложении это может быть Canvas API или HTML/CSS рендеринг
  }, [template, data])

  if (!template) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">🎨</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Выберите шаблон
          </h3>
          <p className="text-gray-600">
            Выберите шаблон из галереи для начала редактирования
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex items-center justify-center">
      {/* Canvas Container */}
      <div className="relative">
        {/* Canvas */}
        <div
          ref={canvasRef}
          className="bg-white shadow-lg rounded-lg overflow-hidden"
          style={{
            width: '600px',
            height: '800px',
            maxWidth: '100%',
            maxHeight: '100%',
          }}
        >
          {/* Template Preview */}
          <div className="w-full h-full relative">
            {/* Background */}
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: data?.backgroundImage ? `url(${data.backgroundImage})` : 'none',
                backgroundColor: data?.primaryColor || '#8B5CF6',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            
            {/* Content */}
            <div className="absolute inset-0 p-8 flex flex-col justify-center items-center text-center">
              <div className="text-white">
                <h1 
                  className="text-4xl font-bold mb-4"
                  style={{ fontFamily: data?.fontFamily || 'Inter' }}
                >
                  {data?.title || 'Свадебное приглашение'}
                </h1>
                
                <p className="text-xl mb-6 opacity-90">
                  {data?.description || 'Приглашаем вас на нашу свадьбу'}
                </p>
                
                {data?.eventDate && (
                  <div className="mb-4">
                    <p className="text-lg font-medium">Дата и время</p>
                    <p className="text-xl">
                      {data.eventDate} в {data.eventTime}
                    </p>
                  </div>
                )}
                
                {data?.venue && (
                  <div className="mb-4">
                    <p className="text-lg font-medium">Место проведения</p>
                    <p className="text-xl">{data.venue}</p>
                    {data.venueAddress && (
                      <p className="text-lg opacity-90">{data.venueAddress}</p>
                    )}
                  </div>
                )}
                
                {data?.dressCode && (
                  <div className="mb-4">
                    <p className="text-lg font-medium">Дресс-код</p>
                    <p className="text-xl">{data.dressCode}</p>
                  </div>
                )}
                
                {data?.additionalInfo && (
                  <div className="mt-6 p-4 bg-white bg-opacity-20 rounded-lg">
                    <p className="text-lg">{data.additionalInfo}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Canvas Controls */}
        <div className="absolute top-4 right-4 flex space-x-2">
          <button className="p-2 bg-white bg-opacity-90 rounded-lg shadow-md hover:bg-opacity-100 transition-all">
            <span className="text-sm font-medium">100%</span>
          </button>
        </div>
      </div>
    </div>
  )
} 