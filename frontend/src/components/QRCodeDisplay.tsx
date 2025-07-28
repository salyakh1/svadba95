'use client'

import { useState, useEffect } from 'react'
import { Download, Share2, Copy, Check } from 'lucide-react'
import { invitationSiteAPI } from '@/lib/api'
import toast from 'react-hot-toast'

interface QRCodeDisplayProps {
  invitationId: string
  invitationTitle?: string
}

export default function QRCodeDisplay({ invitationId, invitationTitle }: QRCodeDisplayProps) {
  const [qrData, setQrData] = useState<{
    qrCodeUrl: string
    qrCodeImage: string
    invitationUrl: string
  } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const fetchQRCode = async () => {
      try {
        setIsLoading(true)
        const response = await invitationSiteAPI.getQRCode(invitationId)
        if (response.success && response.data) {
          setQrData(response.data)
        }
      } catch (error) {
        console.error('Ошибка загрузки QR-кода:', error)
        toast.error('Не удалось загрузить QR-код')
      } finally {
        setIsLoading(false)
      }
    }

    fetchQRCode()
  }, [invitationId])

  const handleDownloadQR = () => {
    if (!qrData?.qrCodeImage) return

    const link = document.createElement('a')
    link.href = qrData.qrCodeImage
    link.download = `qr-${invitationTitle || 'invitation'}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    toast.success('QR-код скачан')
  }

  const handleCopyLink = async () => {
    if (!qrData?.invitationUrl) return

    try {
      await navigator.clipboard.writeText(qrData.invitationUrl)
      setCopied(true)
      toast.success('Ссылка скопирована')
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      toast.error('Не удалось скопировать ссылку')
    }
  }

  const handleShare = async () => {
    if (!qrData?.invitationUrl) return

    if (navigator.share) {
      try {
        await navigator.share({
          title: invitationTitle || 'Свадебное приглашение',
          text: 'Приглашение на свадьбу',
          url: qrData.invitationUrl,
        })
      } catch (error) {
        console.error('Ошибка при попытке поделиться:', error)
      }
    } else {
      // Fallback для браузеров без поддержки Web Share API
      handleCopyLink()
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!qrData) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-600">QR-код не найден</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          QR-код приглашения
        </h3>
        <p className="text-sm text-gray-600">
          Отсканируйте QR-код, чтобы открыть приглашение
        </p>
      </div>

      {/* QR-код */}
      <div className="flex justify-center mb-6">
        <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
          <img
            src={qrData.qrCodeImage}
            alt="QR-код приглашения"
            className="w-48 h-48"
          />
        </div>
      </div>

      {/* Ссылка */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Ссылка на приглашение:
        </label>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={qrData.invitationUrl}
            readOnly
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm bg-gray-50"
          />
          <button
            onClick={handleCopyLink}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
            title="Копировать ссылку"
          >
            {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Кнопки действий */}
      <div className="flex space-x-3">
        <button
          onClick={handleDownloadQR}
          className="flex-1 flex items-center justify-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors"
        >
          <Download className="h-4 w-4" />
          <span>Скачать QR</span>
        </button>
        
        <button
          onClick={handleShare}
          className="flex-1 flex items-center justify-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
        >
          <Share2 className="h-4 w-4" />
          <span>Поделиться</span>
        </button>
      </div>

      {/* Инструкции */}
      <div className="mt-6 p-4 bg-blue-50 rounded-md">
        <h4 className="font-medium text-blue-900 mb-2">Как использовать:</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Скачайте QR-код и отправьте клиенту</li>
          <li>• Клиент может отсканировать QR-код камерой телефона</li>
          <li>• Или перешлите ссылку напрямую</li>
        </ul>
      </div>
    </div>
  )
} 