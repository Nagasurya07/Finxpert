# 💰 FinXpert – AI-Powered Finance Tracker 🔥

Manage your expenses effortlessly with **FinXpert**, a full-stack AI Finance Platform built using modern technologies like **Next.js**, **Supabase**, **Prisma**, **Tailwind CSS**, **Clerk**, **ArcJet**, **Inngest**, and **Gemini AI**. 

Think of it as your **PhonePe Expense Tracker 2.0**, designed for personal financial control, smart insights, and a seamless experience.

---

## 🚀 Features

- 🔐 Secure authentication with Clerk
- 📊 Smart expense tracking dashboard
- 🤖 AI-powered insights using Gemini API
- 🧠 Serverless task management via Inngest
- 🛡️ API protection with ArcJet
- 💅 Beautiful UI with Tailwind CSS and Shadcn UI
- 🗃️ Real-time database with Supabase
- 📧 Email notifications with Resend
- 🧭 Onboarding flow for personalized setup

---

## 🧪 Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/), [Shadcn UI](https://ui.shadcn.com/)
- **Backend**: [Supabase](https://supabase.io/), [Prisma](https://www.prisma.io/)
- **AI Integration**: [Gemini API](https://ai.google.dev/)
- **Authentication**: [Clerk.dev](https://clerk.dev/)
- **Background Tasks**: [Inngest](https://www.inngest.com/)
- **Security**: [ArcJet](https://arcjet.com/)
- **Email**: [Resend](https://resend.com/)

---

## ⚙️ Environment Variables

Create a `.env` file at the root of your project and add the following variables:

```env
# Database
DATABASE_URL=
DIRECT_URL=

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

# Gemini AI
GEMINI_API_KEY=

# Resend Email Service
RESEND_API_KEY=

# ArcJet Security
ARCJET_KEY=
