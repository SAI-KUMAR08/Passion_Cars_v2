# Passion Car — Project Info

## Tech Stack
- Next.js 14 App Router, Prisma, Supabase PostgreSQL
- Tailwind CSS, Framer Motion, Lucide React

## Auth System
- Phone + OTP based (no email/password login)
- Admin: phone + password at `/admin/login`
- Regular users: OTP at `/login` or `/signup`

## Seeded Credentials
- Admin: +919999988888 / admin@6781
- Demo: +918639423380 (OTP only)

## Key Files
- `prisma/schema.prisma` — User (phone, email?, password?), Otp, Car, Setting
- `src/context/AuthContext.tsx` — sendOtp, verifyOtp, adminLogin
- `src/app/api/auth/send-otp/route.ts` — 6-digit OTP, 5-min expiry
- `src/app/api/auth/verify-otp/route.ts` — login or register via OTP
- `src/app/api/auth/admin-login/route.ts` — admin phone+password
- `src/data/carModels.ts` — brand → models mapping for sell page

## Live URL
- https://passion-cars-black.vercel.app
