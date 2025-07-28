'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { useTemplateStore } from '@/store/templateStore'
import { useInvitationStore } from '@/store/invitationStore'
import DashboardLayout from '@/components/layouts/DashboardLayout'
import EditorToolbar from '@/components/editor/EditorToolbar'
import EditorCanvas from '@/components/editor/EditorCanvas'
import EditorSidebar from '@/components/editor/EditorSidebar'
import { Save, Eye, Download, Share } from 'lucide-react'

export default function EditorPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { isAuthenticated } = useAuthStore()
  const { currentTemplate, fetchTemplate } = useTemplateStore()
  const { currentInvitation, createInvitation, updateInvitation } = useInvitationStore()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [editorData, setEditorData] = useState<any>(null)

  const templateId = searchParams.get('template')
  const invitationId = searchParams.get('id')

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
      return
    }

    const initializeEditor = async () => {
      try {
        if (templateId) {
          await fetchTemplate(templateId)
          setEditorData({
            templateId,
            title: 'Мое свадебное приглашение',
            description: 'Приглашаем вас на нашу свадьбу',
            eventDate: '',
            eventTime: '',
            venue: '',
            venueAddress: '',
            dressCode: '',
            additionalInfo: '',
            primaryColor: '#8B5CF6',
            secondaryColor: '#EC4899',
            fontFamily: 'Inter',
            backgroundImage: '',
          })
        } else if (invitationId) {
          // Загрузить существующее приглашение
          // await fetchInvitation(invitationId)
        }
      } catch (error) {
        console.error('Ошибка инициализации редактора:', error)
      } finally {
        setIsLoading(false)
      }
    }

    initializeEditor()
  }, [isAuthenticated, router, templateId, invitationId, fetchTemplate])

  const handleSave = async () => {
    if (!editorData) return

    setIsSaving(true)
    try {
      if (invitationId) {
        await updateInvitation(invitationId, editorData)
      } else {
        await createInvitation(editorData)
      }
      // Показать уведомление об успешном сохранении
    } catch (error) {
      console.error('Ошибка сохранения:', error)
      // Показать уведомление об ошибке
    } finally {
      setIsSaving(false)
    }
  }

  const handlePreview = () => {
    // Открыть превью в новой вкладке
    window.open(`/preview/${currentInvitation?.id || 'new'}`, '_blank')
  }

  const handleDownload = () => {
    // Скачать PDF
    // downloadPDF(currentInvitation)
  }

  const handleShare = () => {
    if (currentInvitation?.id) {
      const url = `${window.location.origin}/invitation/${currentInvitation.id}`
      navigator.clipboard.writeText(url)
      // Показать уведомление о копировании ссылки
    }
  }

  if (!isAuthenticated) {
    return null
  }

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="h-screen flex flex-col">
        {/* Editor Toolbar */}
        <EditorToolbar
          onSave={handleSave}
          onPreview={handlePreview}
          onDownload={handleDownload}
          onShare={handleShare}
          isSaving={isSaving}
        />

        {/* Editor Content */}
        <div className="flex-1 flex">
          {/* Editor Canvas */}
          <div className="flex-1 bg-gray-50 p-4">
            <EditorCanvas
              template={currentTemplate}
              data={editorData}
              onChange={setEditorData}
            />
          </div>

          {/* Editor Sidebar */}
          <div className="w-80 bg-white border-l border-gray-200">
            <EditorSidebar
              data={editorData}
              onChange={setEditorData}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
} 