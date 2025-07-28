'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Heart, ArrowLeft } from 'lucide-react'
import RegisterForm from '@/components/forms/RegisterForm'
import { useAuthStore } from '@/store/authStore'

export default function RegisterPage() {
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()

  // Редирект если уже авторизован
  if (isAuthenticated) {
    router.push('/dashboard')
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50">
      {/* Header */}
      <header className="relative z-10">
        <nav className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <ArrowLeft className="h-5 w-5 text-gray-600" />
              <span className="text-gray-600 hover:text-gray-900">Назад на главную</span>
            </Link>
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-primary-600" />
              <span className="text-2xl font-bold text-gradient">WeddingInvitations</span>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <div className="card shadow-soft">
            <div className="card-body">
              <RegisterForm
                onSuccess={() => router.push('/dashboard')}
                onSwitchToLogin={() => router.push('/login')}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 