import { Router } from 'express';
import {
  addGuests,
  getGuestsByInvitationSite,
  submitRSVP,
  getRSVPStats,
  updateGuest,
  deleteGuest,
} from '../controllers/guestController';
import { authenticateUser, requireAuth } from '../middleware/auth';
import { asyncHandler } from '../middleware/errorHandler';

const router = Router();

// Добавить гостей (требует аутентификации)
router.post('/', authenticateUser, requireAuth, asyncHandler(addGuests));

// Получить гостей сайта приглашения (требует аутентификации)
router.get('/:invitationSiteId', authenticateUser, requireAuth, asyncHandler(getGuestsByInvitationSite));

// Отправить RSVP (публичный endpoint)
router.post('/rsvp/:guestId', asyncHandler(submitRSVP));

// Получить статистику RSVP (требует аутентификации)
router.get('/stats/:invitationSiteId', authenticateUser, requireAuth, asyncHandler(getRSVPStats));

// Обновить гостя (требует аутентификации)
router.put('/:guestId', authenticateUser, requireAuth, asyncHandler(updateGuest));

// Удалить гостя (требует аутентификации)
router.delete('/:guestId', authenticateUser, requireAuth, asyncHandler(deleteGuest));

export default router; 