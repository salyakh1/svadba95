import { Router } from 'express';
import {
  createInvitationSite,
  getUserInvitationSites,
  getInvitationSiteBySlug,
  updateInvitationSite,
  deleteInvitationSite,
  publishInvitationSite,
  getInvitationQR,
} from '../controllers/invitationSiteController';
import { authenticateUser, requireAuth } from '../middleware/auth';
import { asyncHandler } from '../middleware/errorHandler';

const router = Router();

// Создать сайт приглашения (требует аутентификации)
router.post('/', authenticateUser, requireAuth, asyncHandler(createInvitationSite));

// Получить сайты пользователя (требует аутентификации)
router.get('/user', authenticateUser, requireAuth, asyncHandler(getUserInvitationSites));

// Получить публичный сайт по slug (без аутентификации)
router.get('/public/:slug', asyncHandler(getInvitationSiteBySlug));

// Обновить сайт приглашения (требует аутентификации)
router.put('/:id', authenticateUser, requireAuth, asyncHandler(updateInvitationSite));

// Удалить сайт приглашения (требует аутентификации)
router.delete('/:id', authenticateUser, requireAuth, asyncHandler(deleteInvitationSite));

// Опубликовать сайт приглашения (требует аутентификации)
router.post('/:id/publish', authenticateUser, requireAuth, asyncHandler(publishInvitationSite));

// Получить QR-код приглашения (требует аутентификации)
router.get('/:id/qr', authenticateUser, requireAuth, asyncHandler(getInvitationQR));

export default router; 