'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { useInvitationStore } from '@/store/invitationStore'
import DashboardLayout from '@/components/layouts/DashboardLayout'
import { Plus, Eye, Edit, Trash2, Calendar, Users, Heart } from 'lucide-react'

export default function DashboardPage() {
  const router = useRouter()
  const { isAuthenticated, user } = useAuthStore()
  const { invitations, fetchInvitations, deleteInvitation } = useInvitationStore()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
      return
    }

    const loadData = async () => {
      try {
        await fetchInvitations()
      } catch (error) {
        console.error('Ошибка загрузки приглашений:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [isAuthenticated, router, fetchInvitations])

  const handleCreateNew = () => {
    router.push('/dashboard/templates')
  }

  const handleViewInvitation = (id: string) => {
    router.push(`/dashboard/invitations/${id}`)
  }

  const handleEditInvitation = (id: string) => {
    router.push(`/dashboard/editor/${id}`)
  }

  const handleDeleteInvitation = async (id: string) => {
    if (confirm('Вы уверены, что хотите удалить это приглашение?')) {
      try {
        await deleteInvitation(id)
      } catch (error) {
        console.error('Ошибка удаления:', error)
      }
    }
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
            <h1 className="text-3xl font-bold text-gray-900">
              Добро пожаловать, {user?.firstName}!
            </h1>
            <p className="text-gray-600 mt-2">
              Управляйте вашими свадебными приглашениями
            </p>
          </div>
          <button
            onClick={handleCreateNew}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Создать приглашение</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Всего приглашений</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {invitations.length}
                  </p>
                </div>
                <div className="p-3 bg-primary-100 rounded-full">
                  <Heart className="h-6 w-6 text-primary-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Активные</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {invitations.filter(inv => inv.status === 'active').length}
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <Eye className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Гостей приглашено</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {invitations.reduce((total, inv) => total + (inv.guests?.length || 0), 0)}
                  </p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Invitations List */}
        <div className="card">
          <div className="card-header">
            <h2 className="text-xl font-semibold text-gray-900">Ваши приглашения</h2>
          </div>
          <div className="card-body">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
              </div>
            ) : invitations.length === 0 ? (
              <div className="text-center py-12">
                <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  У вас пока нет приглашений
                </h3>
                <p className="text-gray-600 mb-6">
                  Создайте первое свадебное приглашение и поделитесь им с гостями
                </p>
                <button
                  onClick={handleCreateNew}
                  className="btn-primary"
                >
                  Создать приглашение
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {invitations.map((invitation) => (
                  <div
                    key={invitation.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-lg flex items-center justify-center">
                        <Heart className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {invitation.title || 'Свадебное приглашение'}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Создано {new Date(invitation.createdAt).toLocaleDateString('ru-RU')}
                        </p>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-xs text-gray-500">
                            {invitation.guests?.length || 0} гостей
                          </span>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            invitation.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {invitation.status === 'active' ? 'Активно' : 'Черновик'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleViewInvitation(invitation.id)}
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Просмотреть"
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleEditInvitation(invitation.id)}
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Редактировать"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteInvitation(invitation.id)}
                        className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                        title="Удалить"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
} 