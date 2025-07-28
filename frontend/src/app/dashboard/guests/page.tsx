'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { useGuestStore } from '@/store/guestStore'
import DashboardLayout from '@/components/layouts/DashboardLayout'
import { Plus, Search, Filter, Mail, Phone, User, Trash2, Edit, Eye } from 'lucide-react'

export default function GuestsPage() {
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()
  const { guests, fetchGuests, deleteGuest, isLoading } = useGuestStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
      return
    }

    fetchGuests()
  }, [isAuthenticated, router, fetchGuests])

  const statusOptions = [
    { id: 'all', name: 'Все гости' },
    { id: 'yes', name: 'Подтвердили' },
    { id: 'no', name: 'Отказались' },
    { id: 'maybe', name: 'Не определились' },
    { id: 'pending', name: 'Ожидают ответа' },
  ]

  const filteredGuests = guests.filter(guest => {
    const matchesSearch = guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guest.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guest.phone?.includes(searchTerm)
    const matchesStatus = selectedStatus === 'all' || guest.rsvp === selectedStatus
    return matchesSearch && matchesStatus
  })

  const handleAddGuest = () => {
    router.push('/dashboard/guests/new')
  }

  const handleEditGuest = (id: string) => {
    router.push(`/dashboard/guests/${id}/edit`)
  }

  const handleDeleteGuest = async (id: string) => {
    if (confirm('Вы уверены, что хотите удалить этого гостя?')) {
      try {
        await deleteGuest(id)
      } catch (error) {
        console.error('Ошибка удаления гостя:', error)
      }
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'yes': return 'bg-green-100 text-green-800'
      case 'no': return 'bg-red-100 text-red-800'
      case 'maybe': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'yes': return 'Подтвердил'
      case 'no': return 'Отказался'
      case 'maybe': return 'Не определился'
      default: return 'Ожидает ответа'
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
            <h1 className="text-3xl font-bold text-gray-900">Список гостей</h1>
            <p className="text-gray-600 mt-2">
              Управляйте списком приглашенных гостей
            </p>
          </div>
          <button
            onClick={handleAddGuest}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Добавить гостя</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="card">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Всего гостей</p>
                  <p className="text-2xl font-bold text-gray-900">{guests.length}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Подтвердили</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {guests.filter(g => g.rsvp === 'yes').length}
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <User className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Отказались</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {guests.filter(g => g.rsvp === 'no').length}
                  </p>
                </div>
                <div className="p-3 bg-red-100 rounded-full">
                  <User className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Ожидают ответа</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {guests.filter(g => !g.rsvp || g.rsvp === 'maybe').length}
                  </p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-full">
                  <User className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск гостей..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-10 w-full"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="input"
            >
              {statusOptions.map(option => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Guests List */}
        <div className="card">
          <div className="card-header">
            <h2 className="text-xl font-semibold text-gray-900">Гости</h2>
          </div>
          <div className="card-body">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
              </div>
            ) : filteredGuests.length === 0 ? (
              <div className="text-center py-12">
                <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Гости не найдены
                </h3>
                <p className="text-gray-600 mb-6">
                  Добавьте первого гостя в список приглашенных
                </p>
                <button
                  onClick={handleAddGuest}
                  className="btn-primary"
                >
                  Добавить гостя
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredGuests.map((guest) => (
                  <div
                    key={guest.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-lg flex items-center justify-center">
                        <User className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {guest.name}
                          {guest.plusOne && guest.plusOneName && (
                            <span className="text-sm text-gray-500 ml-2">
                              + {guest.plusOneName}
                            </span>
                          )}
                        </h3>
                        <div className="flex items-center space-x-4 mt-1">
                          {guest.email && (
                            <div className="flex items-center space-x-1 text-sm text-gray-500">
                              <Mail className="h-4 w-4" />
                              <span>{guest.email}</span>
                            </div>
                          )}
                          {guest.phone && (
                            <div className="flex items-center space-x-1 text-sm text-gray-500">
                              <Phone className="h-4 w-4" />
                              <span>{guest.phone}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <span className={`px-3 py-1 text-sm rounded-full ${getStatusColor(guest.rsvp || 'pending')}`}>
                        {getStatusText(guest.rsvp || 'pending')}
                      </span>
                      
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEditGuest(guest.id)}
                          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Редактировать"
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteGuest(guest.id)}
                          className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                          title="Удалить"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
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