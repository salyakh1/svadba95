'use client'

import { Save, Eye, Download, Share, Undo, Redo } from 'lucide-react'

interface EditorToolbarProps {
  onSave: () => void
  onPreview: () => void
  onDownload: () => void
  onShare: () => void
  onUndo?: () => void
  onRedo?: () => void
  isSaving: boolean
  canUndo?: boolean
  canRedo?: boolean
}

export default function EditorToolbar({
  onSave,
  onPreview,
  onDownload,
  onShare,
  onUndo,
  onRedo,
  isSaving,
  canUndo = false,
  canRedo = false,
}: EditorToolbarProps) {
  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Left side - Undo/Redo */}
        <div className="flex items-center space-x-2">
          <button
            onClick={onUndo}
            disabled={!canUndo}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Отменить"
          >
            <Undo className="h-5 w-5" />
          </button>
          <button
            onClick={onRedo}
            disabled={!canRedo}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Повторить"
          >
            <Redo className="h-5 w-5" />
          </button>
        </div>

        {/* Center - Title */}
        <div className="flex-1 text-center">
          <h1 className="text-lg font-semibold text-gray-900">
            Редактор приглашений
          </h1>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center space-x-2">
          <button
            onClick={onPreview}
            className="btn-secondary flex items-center space-x-2"
            title="Предварительный просмотр"
          >
            <Eye className="h-4 w-4" />
            <span>Превью</span>
          </button>

          <button
            onClick={onDownload}
            className="btn-secondary flex items-center space-x-2"
            title="Скачать PDF"
          >
            <Download className="h-4 w-4" />
            <span>Скачать</span>
          </button>

          <button
            onClick={onShare}
            className="btn-secondary flex items-center space-x-2"
            title="Поделиться"
          >
            <Share className="h-4 w-4" />
            <span>Поделиться</span>
          </button>

          <button
            onClick={onSave}
            disabled={isSaving}
            className="btn-primary flex items-center space-x-2"
            title="Сохранить"
          >
            <Save className="h-4 w-4" />
            <span>{isSaving ? 'Сохранение...' : 'Сохранить'}</span>
          </button>
        </div>
      </div>
    </div>
  )
} 