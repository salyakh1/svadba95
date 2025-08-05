# 🔧 Переменные окружения для Vercel

## 📋 Добавьте эти переменные в Vercel Dashboard

Перейдите в **Settings** → **Environment Variables** и добавьте:

### 🗄️ Supabase Database
```env
DATABASE_URL=postgresql://postgres:salean9595@db.qwgrrzhcqctxcoicxzti.supabase.co:5432/postgres
DIRECT_URL=postgresql://postgres:salean9595@db.qwgrrzhcqctxcoicxzti.supabase.co:5432/postgres
```

### 🔐 Supabase Auth
```env
SUPABASE_URL=https://qwgrrzhcqctxcoicxzti.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF3Z3JyemhjcWN0eGNvaWN4enRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0MjIzMzgsImV4cCI6MjA2OTk5ODMzOH0.fpMj4RKRLbnZrAGfedRWu6f2plrg6oXTDRfG_CaTuzs
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF3Z3JyemhjcWN0eGNvaWN4enRpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NDQyMjMzOCwiZXhwIjoyMDY5OTk4MzM4fQ.JxMGpj7kVqcpkmCPNgYaB1xdSV5Cdn_A15MpmVbkEok
```

### 🔑 JWT
```env
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

### 🌐 URLs (замените на ваши)
```env
FRONTEND_URL=https://your-project.vercel.app
CORS_ORIGIN=https://your-project.vercel.app
BACKEND_URL=https://your-backend.vercel.app
```

### 📧 Email (опционально)
```env
SENDGRID_API_KEY=your-sendgrid-api-key
FROM_EMAIL=noreply@yourdomain.com
```

### 📱 SMS (опционально)
```env
TWILIO_ACCOUNT_SID=your-twilio-account-sid
TWILIO_AUTH_TOKEN=your-twilio-auth-token
TWILIO_PHONE_NUMBER=+1234567890
```

## ⚠️ Важно!

1. ✅ **Пароль базы данных уже добавлен:** `salean9595`
2. **Замените `your-project.vercel.app`** на реальный URL вашего проекта
3. **Сгенерируйте новый `JWT_SECRET`** для безопасности

## 🔍 Где найти пароль базы данных?

1. В Supabase Dashboard перейдите в **Settings** → **Database**
2. Найдите секцию **Connection string**
3. Скопируйте пароль из строки подключения

## 🚀 После добавления переменных

1. Нажмите **Save** в Vercel
2. Перейдите в **Deployments**
3. Нажмите **Redeploy** для применения новых переменных

## 📋 Готовые переменные для копирования

```env
DATABASE_URL=postgresql://postgres:salean9595@db.qwgrrzhcqctxcoicxzti.supabase.co:5432/postgres
DIRECT_URL=postgresql://postgres:salean9595@db.qwgrrzhcqctxcoicxzti.supabase.co:5432/postgres
SUPABASE_URL=https://qwgrrzhcqctxcoicxzti.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF3Z3JyemhjcWN0eGNvaWN4enRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0MjIzMzgsImV4cCI6MjA2OTk5ODMzOH0.fpMj4RKRLbnZrAGfedRWu6f2plrg6oXTDRfG_CaTuzs
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF3Z3JyemhjcWN0eGNvaWN4enRpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NDQyMjMzOCwiZXhwIjoyMDY5OTk4MzM4fQ.JxMGpj7kVqcpkmCPNgYaB1xdSV5Cdn_A15MpmVbkEok
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
FRONTEND_URL=https://your-project.vercel.app
CORS_ORIGIN=https://your-project.vercel.app
BACKEND_URL=https://your-backend.vercel.app
``` 