import { Request, Response } from 'express';
import { prisma } from '../utils/database';
import { ValidationError, NotFoundError } from '../utils/errors';
import { GuestRequest, RSVPRequest } from '../types';

export async function addGuests(req: Request, res: Response): Promise<void> {
  const { invitationSiteId, guests }: { invitationSiteId: string; guests: GuestRequest[] } = req.body;

  if (!invitationSiteId || !guests || !Array.isArray(guests)) {
    throw new ValidationError('Invitation site ID and guests array are required');
  }

  // Проверка существования сайта приглашения
  const invitationSite = await prisma.invitationSite.findUnique({
    where: { id: invitationSiteId },
  });

  if (!invitationSite) {
    throw new NotFoundError('Invitation site not found');
  }

  // Создание гостей
  const createdGuests = await prisma.guest.createMany({
    data: guests.map(guest => ({
      invitationSiteId,
      name: guest.name,
      email: guest.email,
      phone: guest.phone,
    })),
  });

  res.status(201).json({
    success: true,
    data: { count: createdGuests.count },
    message: `${createdGuests.count} guests added successfully`,
  });
}

export async function getGuestsByInvitationSite(req: Request, res: Response): Promise<void> {
  const { invitationSiteId } = req.params;

  const guests = await prisma.guest.findMany({
    where: { invitationSiteId },
    orderBy: { name: 'asc' },
  });

  res.json({
    success: true,
    data: guests,
  });
}

export async function submitRSVP(req: Request, res: Response): Promise<void> {
  const { guestId } = req.params;
  const { status, mealPreference, tableNumber, notes }: RSVPRequest = req.body;

  if (!status) {
    throw new ValidationError('RSVP status is required');
  }

  // Проверка существования гостя
  const guest = await prisma.guest.findUnique({
    where: { id: guestId },
  });

  if (!guest) {
    throw new NotFoundError('Guest not found');
  }

  // Обновление RSVP
  const updatedGuest = await prisma.guest.update({
    where: { id: guestId },
    data: {
      rsvpStatus: status,
      mealPreference,
      tableNumber,
      notes,
      respondedAt: new Date(),
    },
  });

  res.json({
    success: true,
    data: updatedGuest,
    message: 'RSVP submitted successfully',
  });
}

export async function getRSVPStats(req: Request, res: Response): Promise<void> {
  const { invitationSiteId } = req.params;

  const stats = await prisma.guest.groupBy({
    by: ['rsvpStatus'],
    where: { invitationSiteId },
    _count: {
      rsvpStatus: true,
    },
  });

  const totalGuests = await prisma.guest.count({
    where: { invitationSiteId },
  });

  const respondedGuests = await prisma.guest.count({
    where: {
      invitationSiteId,
      respondedAt: { not: null },
    },
  });

  const responseRate = totalGuests > 0 ? (respondedGuests / totalGuests) * 100 : 0;

  res.json({
    success: true,
    data: {
      stats,
      totalGuests,
      respondedGuests,
      responseRate: Math.round(responseRate * 100) / 100,
    },
  });
}

export async function updateGuest(req: Request, res: Response): Promise<void> {
  const { guestId } = req.params;
  const { name, email, phone, tableNumber } = req.body;

  const guest = await prisma.guest.update({
    where: { id: guestId },
    data: {
      name,
      email,
      phone,
      tableNumber,
    },
  });

  res.json({
    success: true,
    data: guest,
    message: 'Guest updated successfully',
  });
}

export async function deleteGuest(req: Request, res: Response): Promise<void> {
  const { guestId } = req.params;

  await prisma.guest.delete({
    where: { id: guestId },
  });

  res.json({
    success: true,
    message: 'Guest deleted successfully',
  });
} 