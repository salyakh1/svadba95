import { Router } from 'express';
import {
  getAllTemplates,
  getTemplateById,
  createTemplate,
  updateTemplate,
  deleteTemplate,
} from '../controllers/templateController';
import { asyncHandler } from '../middleware/errorHandler';

const router = Router();

// Получить все шаблоны
router.get('/', asyncHandler(getAllTemplates));

// Получить шаблон по ID
router.get('/:id', asyncHandler(getTemplateById));

// Создать шаблон (только для админов)
router.post('/', asyncHandler(createTemplate));

// Обновить шаблон (только для админов)
router.put('/:id', asyncHandler(updateTemplate));

// Удалить шаблон (только для админов)
router.delete('/:id', asyncHandler(deleteTemplate));

export default router; 