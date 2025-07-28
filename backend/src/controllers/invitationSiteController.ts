import { Request, Response } from 'express';
import { prisma } from '../utils/database';
import { ValidationError, NotFoundError, ConflictError } from '../utils/errors';
import { CreateInvitationSiteRequest, UpdateInvitationSiteRequest, AuthenticatedRequest } from '../types';
import { QRService } from '../services/qrService';

export async function createInvitationSite(req: AuthenticatedRequest, res: Response): Promise<void> {
  const userId = req.user!.id;
  const { templateId, title, slug, configJson, rsvpConfigJson }: CreateInvitationSiteRequest = req.body;

  // Валидация
  if (!templateId || !title || !slug || !configJson) {
    throw new ValidationError('Template ID, title, slug, and config are required');
  }

  // Проверка существования шаблона
  const template = await prisma.template.findUnique({
    where: { id: templateId },
  });

  if (!template) {
    throw new NotFoundError('Template not found');
  }

  // Проверка уникальности slug
  const existingSite = await prisma.invitationSite.findUnique({
    where: { slug },
  });

  if (existingSite) {
    throw new ConflictError('Site with this slug already exists');
  }

  // Создание сайта приглашения
  const invitationSite = await prisma.invitationSite.create({
    data: {
      userId,
      templateId,
      title,
      slug,
      configJson,
      rsvpConfigJson,
    },
    include: {
      template: {
        select: {
          id: true,
          name: true,
          previewUrl: true,
        },
      },
    },
  });

  res.status(201).json({
    success: true,
    data: invitationSite,
    message: 'Invitation site created successfully',
  });
}

export async function getUserInvitationSites(req: AuthenticatedRequest, res: Response): Promise<void> {
  const userId = req.user!.id;

  const invitationSites = await prisma.invitationSite.findMany({
    where: { userId },
    include: {
      template: {
        select: {
          id: true,
          name: true,
          previewUrl: true,
        },
      },
      guests: {
        select: {
          id: true,
          name: true,
          rsvpStatus: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  res.json({
    success: true,
    data: invitationSites,
  });
}

export async function getInvitationSiteBySlug(req: Request, res: Response): Promise<void> {
  const { slug } = req.params;

  const invitationSite = await prisma.invitationSite.findUnique({
    where: { slug },
    include: {
      template: {
        select: {
          id: true,
          name: true,
          configJson: true,
        },
      },
    },
  });

  if (!invitationSite) {
    throw new NotFoundError('Invitation site not found');
  }

  if (!invitationSite.isPublished) {
    throw new NotFoundError('Invitation site is not published');
  }

  res.json({
    success: true,
    data: invitationSite,
  });
}

export async function updateInvitationSite(req: AuthenticatedRequest, res: Response): Promise<void> {
  const userId = req.user!.id;
  const { id } = req.params;
  const { title, configJson, rsvpConfigJson, status }: UpdateInvitationSiteRequest = req.body;

  // Проверка владения сайтом
  const existingSite = await prisma.invitationSite.findFirst({
    where: { id, userId },
  });

  if (!existingSite) {
    throw new NotFoundError('Invitation site not found');
  }

  const updateData: any = {};
  if (title) updateData.title = title;
  if (configJson) updateData.configJson = configJson;
  if (rsvpConfigJson) updateData.rsvpConfigJson = rsvpConfigJson;
  if (status) updateData.status = status;

  const invitationSite = await prisma.invitationSite.update({
    where: { id },
    data: updateData,
    include: {
      template: {
        select: {
          id: true,
          name: true,
          previewUrl: true,
        },
      },
    },
  });

  res.json({
    success: true,
    data: invitationSite,
    message: 'Invitation site updated successfully',
  });
}

export async function deleteInvitationSite(req: AuthenticatedRequest, res: Response): Promise<void> {
  const userId = req.user!.id;
  const { id } = req.params;

  // Проверка владения сайтом
  const existingSite = await prisma.invitationSite.findFirst({
    where: { id, userId },
  });

  if (!existingSite) {
    throw new NotFoundError('Invitation site not found');
  }

  await prisma.invitationSite.delete({
    where: { id },
  });

  res.json({
    success: true,
    message: 'Invitation site deleted successfully',
  });
}

export async function publishInvitationSite(req: AuthenticatedRequest, res: Response): Promise<void> {
  const userId = req.user!.id;
  const { id } = req.params;

  // Проверка владения сайтом
  const existingSite = await prisma.invitationSite.findFirst({
    where: { id, userId },
  });

  if (!existingSite) {
    throw new NotFoundError('Invitation site not found');
  }

  // Генерируем QR-код при публикации
  const baseUrl = process.env['FRONTEND_URL'] || 'http://localhost:3000';
  const qrData = await QRService.generateInvitationQR(existingSite.slug, baseUrl);

  const invitationSite = await prisma.invitationSite.update({
    where: { id },
    data: {
      isPublished: true,
      publishedAt: new Date(),
      status: 'PUBLISHED',
      qrCodeUrl: qrData.qrCodeUrl,
      qrCodeImage: qrData.qrCodeImage,
    },
  });

  res.json({
    success: true,
    data: invitationSite,
    message: 'Invitation site published successfully with QR code',
  });
}

// Получение QR-кода для приглашения
export async function getInvitationQR(req: AuthenticatedRequest, res: Response): Promise<void> {
  const userId = req.user!.id;
  const { id } = req.params;

  // Проверка владения сайтом
  const invitationSite = await prisma.invitationSite.findFirst({
    where: { id, userId },
    select: {
      id: true,
      slug: true,
      qrCodeUrl: true,
      qrCodeImage: true,
      isPublished: true,
    },
  });

  if (!invitationSite) {
    throw new NotFoundError('Invitation site not found');
  }

  // Если QR-код еще не создан, создаем его
  if (!invitationSite.qrCodeImage) {
    const baseUrl = process.env['FRONTEND_URL'] || 'http://localhost:3000';
    const qrData = await QRService.generateInvitationQR(invitationSite.slug, baseUrl);

    await prisma.invitationSite.update({
      where: { id },
      data: {
        qrCodeUrl: qrData.qrCodeUrl,
        qrCodeImage: qrData.qrCodeImage,
      },
    });

    invitationSite.qrCodeUrl = qrData.qrCodeUrl;
    invitationSite.qrCodeImage = qrData.qrCodeImage;
  }

  res.json({
    success: true,
    data: {
      qrCodeUrl: invitationSite.qrCodeUrl,
      qrCodeImage: invitationSite.qrCodeImage,
      invitationUrl: invitationSite.qrCodeUrl,
    },
  });
} 