# 🚀 Деплой на Vercel + Supabase

## 📋 Предварительные требования

1. **GitHub аккаунт** - для хранения кода
2. **Vercel аккаунт** - для хостинга frontend
3. **Supabase аккаунт** - для базы данных
4. **Node.js 18+** - для локальной разработки

## 🗄️ Шаг 1: Настройка Supabase

### 1.1 Создание проекта в Supabase

1. Перейдите на [supabase.com](https://supabase.com)
2. Нажмите "Start your project"
3. Войдите через GitHub
4. Создайте новый проект:
   - **Name**: `wedding-invitations`
   - **Database Password**: придумайте надежный пароль
   - **Region**: выберите ближайший к вам регион

### 1.2 Получение данных подключения

1. В проекте перейдите в **Settings** → **API**
2. Скопируйте следующие данные:
   - **Project URL**
   - **anon public key**
   - **service_role secret key**
   - **Database password**

### 1.3 Настройка базы данных

```bash
# Клонируйте проект
git clone https://github.com/YOUR_USERNAME/wedding-invitations.git
cd wedding-invitations

# Установите зависимости
npm run install:all

# Настройте переменные окружения
cp backend/env.example backend/.env
# Отредактируйте backend/.env с вашими данными Supabase

# Примените миграции
cd backend
npx prisma generate
npx prisma db push
npm run db:seed
```

## 🌐 Шаг 2: Настройка Vercel

### 2.1 Создание проекта в Vercel

1. Перейдите на [vercel.com](https://vercel.com)
2. Войдите через GitHub
3. Нажмите "New Project"
4. Выберите репозиторий `wedding-invitations`
5. Нажмите "Import"

### 2.2 Настройка переменных окружения

В проекте Vercel перейдите в **Settings** → **Environment Variables** и добавьте:

```env
# Supabase Database
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres
DIRECT_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Frontend URL
FRONTEND_URL=https://your-project.vercel.app
CORS_ORIGIN=https://your-project.vercel.app

# Backend URL (если backend деплоится отдельно)
BACKEND_URL=https://your-backend.vercel.app

# Email (SendGrid)
SENDGRID_API_KEY=your-sendgrid-api-key
FROM_EMAIL=noreply@yourdomain.com

# SMS (Twilio)
TWILIO_ACCOUNT_SID=your-twilio-account-sid
TWILIO_AUTH_TOKEN=your-twilio-auth-token
TWILIO_PHONE_NUMBER=+1234567890
```

### 2.3 Настройка Build Settings

В **Settings** → **General** → **Build & Development Settings**:

- **Framework Preset**: Next.js
- **Build Command**: `cd frontend && npm run build`
- **Output Directory**: `frontend/.next`
- **Install Command**: `npm run install:all`
- **Root Directory**: `frontend`

## 🚀 Шаг 3: Деплой

### 3.1 Автоматический деплой

1. Нажмите "Deploy" в Vercel
2. Дождитесь завершения сборки
3. Проверьте логи на наличие ошибок

### 3.2 Ручной деплой через CLI

```bash
# Установите Vercel CLI
npm install -g vercel

# Войдите в аккаунт
vercel login

# Деплой frontend
cd frontend
vercel --prod

# Деплой backend (если нужно)
cd ../backend
vercel --prod
```

## ✅ Шаг 4: Проверка деплоя

### 4.1 Проверка frontend

1. Откройте ваш сайт: `https://your-project.vercel.app`
2. Проверьте главную страницу
3. Протестируйте регистрацию/вход

### 4.2 Проверка API

1. Откройте: `https://your-project.vercel.app/api/health`
2. Должен вернуться JSON с информацией о сервере

### 4.3 Проверка базы данных

1. В Supabase перейдите в **Table Editor**
2. Убедитесь, что таблицы созданы
3. Проверьте seed данные

## 🔧 Шаг 5: Настройка домена (опционально)

### 5.1 Покупка домена

1. Купите домен (например, weddinginvitations.ru)
2. Настройте DNS записи

### 5.2 Подключение к Vercel

1. В Vercel перейдите в **Settings** → **Domains**
2. Добавьте ваш домен
3. Настройте DNS записи согласно инструкциям

## 📊 Шаг 6: Мониторинг

### 6.1 Vercel Analytics

1. В Vercel перейдите в **Analytics**
2. Включите Web Analytics
3. Добавьте код отслеживания

### 6.2 Supabase Monitoring

1. В Supabase перейдите в **Dashboard**
2. Мониторьте использование базы данных
3. Проверяйте логи запросов

## 🛠️ Устранение проблем

### Проблема: Ошибка подключения к базе данных

```bash
# Проверьте переменные окружения
echo $DATABASE_URL

# Проверьте подключение
npx prisma db pull
```

### Проблема: CORS ошибки

1. Проверьте `CORS_ORIGIN` в переменных окружения
2. Убедитесь, что URL указан правильно

### Проблема: API не отвечает

1. Проверьте логи в Vercel
2. Убедитесь, что backend URL правильный
3. Проверьте health endpoint

## 📞 Поддержка

Если возникли проблемы:

1. **Проверьте логи** в Vercel Dashboard
2. **Проверьте базу данных** в Supabase Dashboard
3. **Создайте issue** в GitHub репозитории
4. **Обратитесь в поддержку** Vercel/Supabase

## 🎯 Результат

После успешного деплоя у вас будет:

- ✅ Рабочий сайт: `https://your-project.vercel.app`
- ✅ База данных в облаке (Supabase)
- ✅ API endpoints для всех функций
- ✅ Система аутентификации
- ✅ QR-коды для приглашений
- ✅ Система заказов
- ✅ Email/SMS рассылка
- ✅ Доступ с любого устройства

## 🔄 Обновления

Для обновления сайта:

1. Внесите изменения в код
2. Запушьте в GitHub
3. Vercel автоматически пересоберет и задеплоит

```bash
git add .
git commit -m "Update features"
git push origin main
``` 