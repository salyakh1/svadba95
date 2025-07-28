# 🚀 Деплой на Vercel

## 📋 Пошаговая инструкция

### **1. Подготовка GitHub репозитория**

1. **Создайте репозиторий на GitHub:**
   - Перейдите на [github.com](https://github.com)
   - Нажмите "New repository"
   - Назовите: `wedding-invitations`
   - Сделайте публичным
   - Нажмите "Create repository"

2. **Загрузите код в GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/wedding-invitations.git
   git push -u origin main
   ```

### **2. Настройка Vercel**

1. **Создайте аккаунт на Vercel:**
   - Перейдите на [vercel.com](https://vercel.com)
   - Войдите через GitHub

2. **Импортируйте проект:**
   - Нажмите "New Project"
   - Выберите репозиторий `wedding-invitations`
   - Нажмите "Import"

3. **Настройте переменные окружения:**
   - В проекте перейдите в Settings → Environment Variables
   - Добавьте все переменные из `SUPABASE_SETUP.md`

### **3. Настройка Build Settings**

1. **Framework Preset:** Next.js
2. **Root Directory:** `frontend`
3. **Build Command:** `npm run build`
4. **Output Directory:** `.next`
5. **Install Command:** `npm install`

### **4. Переменные окружения для Vercel**

Добавьте эти переменные в Vercel:

```env
# Supabase Database
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres
DIRECT_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Frontend URLs
NEXT_PUBLIC_API_URL=https://your-backend.vercel.app
NEXT_PUBLIC_SITE_URL=https://your-frontend.vercel.app

# CORS
CORS_ORIGIN=https://your-frontend.vercel.app

# Email (SendGrid)
SENDGRID_API_KEY=your-sendgrid-api-key
FROM_EMAIL=noreply@yourdomain.com

# SMS (Twilio)
TWILIO_ACCOUNT_SID=your-twilio-account-sid
TWILIO_AUTH_TOKEN=your-twilio-auth-token
TWILIO_PHONE_NUMBER=+1234567890
```

### **5. Деплой**

1. **Нажмите "Deploy"**
2. **Дождитесь завершения сборки**
3. **Проверьте логи на наличие ошибок**

### **6. Настройка доменов**

1. **Получите URL вашего проекта:**
   - Frontend: `https://your-project.vercel.app`
   - Backend: `https://your-project-backend.vercel.app`

2. **Обновите переменные окружения:**
   - `NEXT_PUBLIC_API_URL` = URL вашего backend
   - `NEXT_PUBLIC_SITE_URL` = URL вашего frontend

### **7. Проверка деплоя**

1. **Откройте ваш сайт:**
   - URL будет: `https://your-project.vercel.app`

2. **Протестируйте функции:**
   - Регистрация/вход
   - Создание приглашения
   - Генерация QR-кода
   - Публичная страница приглашения

## 🎯 Результат

После выполнения всех шагов у вас будет:
- ✅ Рабочий сайт: `https://your-project.vercel.app`
- ✅ База данных в облаке
- ✅ QR-коды для приглашений
- ✅ Система заказов
- ✅ Доступ с любого устройства

## 📞 Поддержка

Если возникнут проблемы:
1. Проверьте логи в Vercel
2. Проверьте подключение к базе данных в Supabase
3. Убедитесь, что все переменные окружения настроены правильно 