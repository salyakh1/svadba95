'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Heart, Calendar, MapPin, Users, Phone, Mail, Share2, Download, QrCode, Copy, Check } from 'lucide-react'
import QRCode from 'qrcode.react'
import { motion, AnimatePresence } from 'framer-motion'

interface InvitationData {
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
  guests?: any[]
  blocks?: any[]
  colorScheme?: any
}

// Анимации для блоков
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.9
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
}

const fadeInUp = {
  hidden: { 
    opacity: 0, 
    y: 30 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
}

const scaleIn = {
  hidden: { 
    opacity: 0, 
    scale: 0.8 
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
}

const slideInFromLeft = {
  hidden: { 
    opacity: 0, 
    x: -50 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
}

const slideInFromRight = {
  hidden: { 
    opacity: 0, 
    x: 50 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
}

export default function InvitationPage() {
  const params = useParams()
  const [invitation, setInvitation] = useState<InvitationData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [guestName, setGuestName] = useState('')
  const [guestEmail, setGuestEmail] = useState('')
  const [guestPhone, setGuestPhone] = useState('')
  const [rsvpStatus, setRsvpStatus] = useState<'yes' | 'no' | 'maybe' | null>(null)
  const [plusOne, setPlusOne] = useState(false)
  const [plusOneName, setPlusOneName] = useState('')
  const [showQR, setShowQR] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const fetchInvitation = async () => {
      try {
        // В реальном приложении здесь будет API запрос
        // const response = await fetch(`/api/invitation-sites/${params.id}`)
        // const data = await response.json()
        
        // Временные данные для демонстрации
        setInvitation({
          id: params.id as string,
          title: 'Свадьба Анны и Михаила',
          description: 'Приглашаем вас разделить с нами этот особенный день',
          eventDate: '15 июня 2024',
          eventTime: '16:00',
          venue: 'Ресторан "Времена года"',
          venueAddress: 'ул. Тверская, 15, Москва',
          dressCode: 'Вечерний наряд',
          additionalInfo: 'Пожалуйста, подтвердите ваше присутствие до 1 июня',
          primaryColor: '#8B5CF6',
          secondaryColor: '#EC4899',
          fontFamily: 'Inter',
          blocks: [
            {
              type: 'video',
              url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
              shape: 'rectangle',
              size: 'medium'
            }
          ],
          colorScheme: {
            headingColor: '#8B5CF6',
            mainTextColor: '#374151',
            accentColor: '#EC4899'
          }
        })
      } catch (error) {
        console.error('Ошибка загрузки приглашения:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchInvitation()
  }, [params.id])

  const handleRsvp = async (status: 'yes' | 'no' | 'maybe') => {
    setRsvpStatus(status)
    
    try {
      // В реальном приложении здесь будет API запрос для сохранения RSVP
      console.log('RSVP:', {
        status,
        guestName,
        guestEmail,
        guestPhone,
        plusOne,
        plusOneName,
      })
      
      // Показать уведомление об успехе
    } catch (error) {
      console.error('Ошибка отправки RSVP:', error)
    }
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: invitation?.title || 'Свадебное приглашение',
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const renderBlock = (block: any, index: number) => {
    switch (block.type) {
      case 'video':
        return (
          <motion.div 
            key={index} 
            className="mb-6"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            custom={index}
          >
            <div className={`${block.shape === 'circle' ? 'rounded-full' : 'rounded-lg'} overflow-hidden`}>
              <iframe
                src={block.url}
                className={`w-full ${block.size === 'small' ? 'h-32' : block.size === 'large' ? 'h-64' : 'h-48'}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </motion.div>
        )
      default:
        return null
    }
  }

  if (isLoading) {
    return (
      <motion.div 
        className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
    )
  }

  if (!invitation) {
    return (
      <motion.div 
        className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="text-center"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
        >
          <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Приглашение не найдено</h1>
          <p className="text-gray-600">Возможно, ссылка неверна или приглашение было удалено</p>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <motion.div 
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: invitation.backgroundImage ? `url(${invitation.backgroundImage})` : 'none',
        backgroundColor: invitation.primaryColor,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Overlay */}
      <motion.div 
        className="absolute inset-0 bg-black bg-opacity-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1, delay: 0.5 }}
      />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <motion.div 
          className="max-w-2xl w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main Content */}
          <motion.div 
            className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl"
            variants={scaleIn}
          >
            <motion.div 
              className="text-center mb-8"
              variants={fadeInUp}
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <Heart className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              </motion.div>
              <motion.h1 
                className="text-4xl font-bold text-gray-900 mb-4"
                style={{ 
                  fontFamily: invitation.fontFamily,
                  color: invitation.colorScheme?.headingColor || invitation.primaryColor
                }}
                variants={fadeInUp}
              >
                {invitation.title}
              </motion.h1>
              <motion.p 
                className="text-xl text-gray-600 mb-6"
                style={{ color: invitation.colorScheme?.mainTextColor || '#374151' }}
                variants={fadeInUp}
              >
                {invitation.description}
              </motion.p>
            </motion.div>

            {/* Event Details */}
            <motion.div 
              className="space-y-4 mb-8"
              variants={containerVariants}
            >
              <motion.div 
                className="flex items-center space-x-3"
                variants={slideInFromLeft}
              >
                <Calendar className="h-5 w-5 text-primary-600" />
                <span className="text-gray-700">
                  {invitation.eventDate} в {invitation.eventTime}
                </span>
              </motion.div>

              <motion.div 
                className="flex items-center space-x-3"
                variants={slideInFromRight}
              >
                <MapPin className="h-5 w-5 text-primary-600" />
                <span className="text-gray-700">{invitation.venue}</span>
              </motion.div>

              <motion.div 
                className="flex items-center space-x-3"
                variants={slideInFromLeft}
              >
                <MapPin className="h-5 w-5 text-primary-600" />
                <span className="text-gray-700">{invitation.venueAddress}</span>
              </motion.div>

              {invitation.dressCode && (
                <motion.div 
                  className="flex items-center space-x-3"
                  variants={slideInFromRight}
                >
                  <Users className="h-5 w-5 text-primary-600" />
                  <span className="text-gray-700">Дресс-код: {invitation.dressCode}</span>
                </motion.div>
              )}
            </motion.div>

            {/* Additional Blocks */}
            <AnimatePresence>
              {invitation.blocks?.map((block, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {renderBlock(block, index)}
                </motion.div>
              ))}
            </AnimatePresence>

            {/* RSVP Form */}
            <motion.div 
              className="mt-8 p-6 bg-gray-50 rounded-xl"
              variants={fadeInUp}
            >
              <motion.h3 
                className="text-lg font-semibold text-gray-900 mb-4"
                variants={fadeInUp}
              >
                Подтвердите ваше присутствие
              </motion.h3>

              <motion.div 
                className="space-y-4"
                variants={containerVariants}
              >
                <motion.div variants={slideInFromLeft}>
                  <input
                    type="text"
                    placeholder="Ваше имя"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </motion.div>

                <motion.div variants={slideInFromRight}>
                  <input
                    type="email"
                    placeholder="Email"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </motion.div>

                <motion.div variants={slideInFromLeft}>
                  <input
                    type="tel"
                    placeholder="Телефон"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </motion.div>

                <motion.div 
                  className="flex space-x-2"
                  variants={containerVariants}
                >
                  <motion.button
                    onClick={() => handleRsvp('yes')}
                    className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                      rsvpStatus === 'yes'
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Приду
                  </motion.button>
                  <motion.button
                    onClick={() => handleRsvp('no')}
                    className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                      rsvpStatus === 'no'
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Не приду
                  </motion.button>
                  <motion.button
                    onClick={() => handleRsvp('maybe')}
                    className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                      rsvpStatus === 'maybe'
                        ? 'bg-yellow-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Возможно
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div 
              className="flex flex-wrap gap-3 mt-6"
              variants={containerVariants}
            >
              <motion.button
                onClick={handleShare}
                className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Share2 className="h-4 w-4" />
                <span>Поделиться</span>
              </motion.button>

              <motion.button
                onClick={() => setShowQR(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <QrCode className="h-4 w-4" />
                <span>QR код</span>
              </motion.button>

              <motion.button
                onClick={copyLink}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span>{copied ? 'Скопировано!' : 'Копировать ссылку'}</span>
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* QR Code Modal */}
      <AnimatePresence>
        {showQR && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <QRCode value={window.location.href} size={200} />
              <button
                onClick={() => setShowQR(false)}
                className="mt-4 w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Закрыть
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
} 