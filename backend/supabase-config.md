# Supabase Configuration

## Переменные окружения для Supabase

Добавьте эти переменные в Vercel:

```env
# Supabase Database
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"
DIRECT_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"

# Supabase Auth
SUPABASE_URL="https://[YOUR-PROJECT-REF].supabase.co"
SUPABASE_ANON_KEY="[YOUR-ANON-KEY]"
SUPABASE_SERVICE_ROLE_KEY="[YOUR-SERVICE-ROLE-KEY]"

# JWT
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"

# Frontend URL
FRONTEND_URL="https://your-project.vercel.app"

# Email (SendGrid)
SENDGRID_API_KEY="your-sendgrid-api-key"
FROM_EMAIL="noreply@yourdomain.com"

# SMS (Twilio)
TWILIO_ACCOUNT_SID="your-twilio-account-sid"
TWILIO_AUTH_TOKEN="your-twilio-auth-token"
TWILIO_PHONE_NUMBER="+1234567890"
```

## Шаги настройки:

1. Создайте проект в Supabase
2. Скопируйте URL и ключи из Settings > API
3. Добавьте переменные в Vercel
4. Запустите миграции: `npx prisma db push` 