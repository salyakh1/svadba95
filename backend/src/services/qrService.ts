import QRCode from 'qrcode';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

export class QRService {
  private static uploadsDir = 'uploads/qr-codes';

  // Создание директории для QR-кодов
  private static ensureUploadsDir() {
    if (!existsSync(this.uploadsDir)) {
      mkdirSync(this.uploadsDir, { recursive: true });
    }
  }

  // Генерация QR-кода для приглашения
  static async generateInvitationQR(invitationSlug: string, baseUrl: string): Promise<{
    qrCodeUrl: string;
    qrCodeImage: string;
  }> {
    this.ensureUploadsDir();

    // URL приглашения
    const invitationUrl = `${baseUrl}/invitation/${invitationSlug}`;
    
    // Настройки QR-кода
    const qrOptions = {
      errorCorrectionLevel: 'H' as const, // Высокий уровень коррекции ошибок
      type: 'image/png' as const,
      quality: 0.92,
      margin: 1,
      color: {
        dark: '#000000',  // Цвет QR-кода
        light: '#FFFFFF'  // Цвет фона
      },
      width: 300, // Размер QR-кода
    };

    try {
      // Генерируем QR-код как Data URL
      const qrDataUrl = await QRCode.toDataURL(invitationUrl, qrOptions);
      
      // Сохраняем QR-код как файл
      const fileName = `qr-${invitationSlug}-${Date.now()}.png`;
      const filePath = join(this.uploadsDir, fileName);
      
      // Конвертируем Data URL в Buffer и сохраняем
      const base64Data = qrDataUrl.replace(/^data:image\/png;base64,/, '');
      const buffer = Buffer.from(base64Data, 'base64');
      writeFileSync(filePath, buffer);

      return {
        qrCodeUrl: invitationUrl,
        qrCodeImage: `/uploads/qr-codes/${fileName}`
      };
    } catch (error) {
      console.error('Error generating QR code:', error);
      throw new Error('Failed to generate QR code');
    }
  }

  // Генерация QR-кода с кастомными настройками
  static async generateCustomQR(
    data: string, 
    options: {
      width?: number;
      color?: string;
      backgroundColor?: string;
      logo?: string;
    } = {}
  ): Promise<string> {
    const qrOptions = {
      errorCorrectionLevel: 'H' as const,
      type: 'image/png' as const,
      quality: 0.92,
      margin: 1,
      color: {
        dark: options.color || '#000000',
        light: options.backgroundColor || '#FFFFFF'
      },
      width: options.width || 300,
    };

    try {
      const qrDataUrl = await QRCode.toDataURL(data, qrOptions);
      return qrDataUrl;
    } catch (error) {
      console.error('Error generating custom QR code:', error);
      throw new Error('Failed to generate custom QR code');
    }
  }

  // Генерация QR-кода для WhatsApp
  static async generateWhatsAppQR(phoneNumber: string, message: string): Promise<string> {
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    return this.generateCustomQR(whatsappUrl);
  }

  // Генерация QR-кода для Telegram
  static async generateTelegramQR(username: string, message: string): Promise<string> {
    const telegramUrl = `https://t.me/${username}?text=${encodeURIComponent(message)}`;
    return this.generateCustomQR(telegramUrl);
  }

  // Генерация QR-кода для SMS
  static async generateSMSQR(phoneNumber: string, message: string): Promise<string> {
    const smsUrl = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;
    return this.generateCustomQR(smsUrl);
  }
} 