import nodemailer from 'nodemailer';
import { EmailConfig } from '../types';

// Создание транспорта для отправки email
const transporter = nodemailer.createTransporter({
  service: 'gmail', // или другой сервис
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendEmail(config: EmailConfig): Promise<void> {
  try {
    const mailOptions = {
      from: process.env.FROM_EMAIL || 'noreply@weddinginvitations.com',
      to: config.to,
      subject: config.subject,
      html: config.html,
      text: config.text,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Email sending failed:', error);
    throw new Error('Failed to send email');
  }
}

export function generateInvitationEmail(
  guestName: string,
  siteUrl: string,
  customMessage?: string
): EmailConfig {
  const subject = 'Приглашение на свадьбу';
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Приглашение на свадьбу</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          text-align: center;
          padding: 30px 0;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-radius: 10px 10px 0 0;
        }
        .content {
          padding: 30px;
          background: #f9f9f9;
        }
        .button {
          display: inline-block;
          padding: 12px 30px;
          background: #667eea;
          color: white;
          text-decoration: none;
          border-radius: 25px;
          margin: 20px 0;
          font-weight: bold;
        }
        .footer {
          text-align: center;
          padding: 20px;
          background: #f0f0f0;
          border-radius: 0 0 10px 10px;
          font-size: 12px;
          color: #666;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>💒 Приглашение на свадьбу</h1>
      </div>
      
      <div class="content">
        <p>Дорогой(ая) <strong>${guestName}</strong>!</p>
        
        ${customMessage ? `<p>${customMessage}</p>` : ''}
        
        <p>Мы рады пригласить вас на нашу свадьбу!</p>
        
        <p>Для просмотра подробной информации и подтверждения участия, пожалуйста, перейдите по ссылке:</p>
        
        <div style="text-align: center;">
          <a href="${siteUrl}" class="button">
            📋 Открыть приглашение
          </a>
        </div>
        
        <p style="margin-top: 30px; font-size: 14px; color: #666;">
          Если кнопка не работает, скопируйте эту ссылку в браузер:<br>
          <a href="${siteUrl}" style="color: #667eea;">${siteUrl}</a>
        </p>
      </div>
      
      <div class="footer">
        <p>Это письмо отправлено автоматически. Пожалуйста, не отвечайте на него.</p>
        <p>© 2024 Wedding Invitations Platform</p>
      </div>
    </body>
    </html>
  `;

  const text = `
Приглашение на свадьбу

Дорогой(ая) ${guestName}!

${customMessage ? customMessage + '\n\n' : ''}Мы рады пригласить вас на нашу свадьбу!

Для просмотра подробной информации и подтверждения участия, пожалуйста, перейдите по ссылке:
${siteUrl}

С уважением,
Жених и Невеста
  `;

  return {
    to: '', // Будет установлено при отправке
    subject,
    html,
    text,
  };
}

export function generateRSVPConfirmationEmail(
  guestName: string,
  rsvpStatus: string,
  eventDetails: any
): EmailConfig {
  const subject = 'Подтверждение RSVP';
  
  const statusText = {
    CONFIRMED: 'подтвердили',
    DECLINED: 'отклонили',
    MAYBE: 'возможно придут',
  }[rsvpStatus] || 'ответили на';

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Подтверждение RSVP</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          text-align: center;
          padding: 20px 0;
          background: #28a745;
          color: white;
          border-radius: 10px 10px 0 0;
        }
        .content {
          padding: 30px;
          background: #f9f9f9;
        }
        .status {
          text-align: center;
          padding: 15px;
          background: #d4edda;
          border: 1px solid #c3e6cb;
          border-radius: 5px;
          margin: 20px 0;
        }
        .footer {
          text-align: center;
          padding: 20px;
          background: #f0f0f0;
          border-radius: 0 0 10px 10px;
          font-size: 12px;
          color: #666;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>✅ Подтверждение RSVP</h1>
      </div>
      
      <div class="content">
        <p>Дорогой(ая) <strong>${guestName}</strong>!</p>
        
        <div class="status">
          <h3>Вы ${statusText} приглашение</h3>
        </div>
        
        <p>Спасибо за ваш ответ! Мы рады, что вы ${statusText} наше приглашение.</p>
        
        ${eventDetails ? `
        <h4>Детали мероприятия:</h4>
        <ul>
          ${eventDetails.date ? `<li><strong>Дата:</strong> ${eventDetails.date}</li>` : ''}
          ${eventDetails.time ? `<li><strong>Время:</strong> ${eventDetails.time}</li>` : ''}
          ${eventDetails.venue ? `<li><strong>Место:</strong> ${eventDetails.venue}</li>` : ''}
        </ul>
        ` : ''}
        
        <p>Если у вас есть вопросы, пожалуйста, свяжитесь с нами.</p>
      </div>
      
      <div class="footer">
        <p>© 2024 Wedding Invitations Platform</p>
      </div>
    </body>
    </html>
  `;

  const text = `
Подтверждение RSVP

Дорогой(ая) ${guestName}!

Вы ${statusText} приглашение.

Спасибо за ваш ответ! Мы рады, что вы ${statusText} наше приглашение.

${eventDetails ? `
Детали мероприятия:
${eventDetails.date ? `Дата: ${eventDetails.date}` : ''}
${eventDetails.time ? `Время: ${eventDetails.time}` : ''}
${eventDetails.venue ? `Место: ${eventDetails.venue}` : ''}
` : ''}

Если у вас есть вопросы, пожалуйста, свяжитесь с нами.

С уважением,
Жених и Невеста
  `;

  return {
    to: '', // Будет установлено при отправке
    subject,
    html,
    text,
  };
} 