# Deployment Guide for Care.xyz

This guide outlines the steps to deploy the Care.xyz application to production. We recommend using **Vercel** as it offers the best integration with Next.js.

## Prerequisites

Before interacting with the deployment, ensure you have:

1.  A [GitHub](https://github.com) account with the project repository pushed.
2.  A [Vercel](https://vercel.com) account.
3.  A PostgreSQL database provider (e.g., [Neon](https://neon.tech), [Supabase](https://supabase.com), or [ElephantSUV](https://www.elephantsql.com/)).
4.  A [Stripe](https://stripe.com) account for payments.
5.  A [Google Cloud Console](https://console.cloud.google.com/) project for Google Authentication.
6.  A [Resend](https://resend.com) account for email services.

## 1. Environment Variables

You will need to configure the following environment variables in your deployment platform (Vercel Project Settings > Environment Variables).

| Variable                | Description                                                                          |
| :---------------------- | :----------------------------------------------------------------------------------- |
| `DATABASE_URL`          | The connection string for your PostgreSQL database.                                  |
| `NEXTAUTH_URL`          | The canonical URL of your deployed site (e.g., `https://care-xyz.vercel.app`).       |
| `NEXTAUTH_SECRET`       | A random 32-character string. Generate one using `openssl rand -base64 32`.          |
| `AUTH_GOOGLE_ID`        | OAuth Client ID from Google Cloud Console.                                           |
| `AUTH_GOOGLE_SECRET`    | OAuth Client Secret from Google Cloud Console.                                       |
| `STRIPE_PUBLIC_KEY`     | Publishable key from your Stripe Dashboard (Developers > API keys).                  |
| `STRIPE_SECRET_KEY`     | Secret key from your Stripe Dashboard.                                               |
| `STRIPE_WEBHOOK_SECRET` | Secret for verifying Stripe webhooks. Generated after setting up a webhook endpoint. |
| `RESEND_API_KEY`        | API Key from your Resend dashboard.                                                  |
| `APP_BASE_URL`          | Same as `NEXTAUTH_URL` (used for internal link generation).                          |
| `APP_ENV`               | Set to `production` for the live environment.                                        |

> **Note:** For `NEXTAUTH_URL`, Vercel automatically sets `VERCEL_URL`, but it is best practice to explicitly set `NEXTAUTH_URL` to your production domain.

## 2. Database Setup via Prisma

Care.xyz uses Prisma ORM.

1.  **Get connection string**: Obtain the Postgres connection string from your database provider.
2.  **Set Environment Variable**: Add `DATABASE_URL` to your Vercel environment variables _before_ deployment or during the initial project setup.
3.  **Migration**: Next.js builds on Vercel usually handle generation, but you might need to run migrations manually or set up a build command override if you face issues.
    - **Recommended**: Connect your database to Vercel integrations if supported (like Vercel Postgres or Neon integration), OR
    - Run `npx prisma db push` locally pointed to the production ID to set up the schema initially, or add it to the build script.

    _Standard Build Command:_ `next build`
    _Available Build Command (if migrations needed on build):_ `npx prisma db push && next build`

## 3. Deploying to Vercel

1.  **Import Project**:
    - Log in to Vercel.
    - Click **"Add New..."** -> **"Project"**.
    - Select your GitHub repository `care.xyz`.

2.  **Configure Project**:
    - **Framework Preset**: Next.js (should be auto-detected).
    - **Root Directory**: `./`
    - **Build Command**: `next build` (Default) or `bun run build`.
    - **Install Command**: `bun install` (Vercel detects Bun automatically).

3.  **Add Environment Variables**:
    - Expand the "Environment Variables" section.
    - Copy-paste all keys and values from your local `.env` (excluding localhost URLs, update them to your production domain).
    - **Initial Deploy Tip**: You might not know your `NEXTAUTH_URL` domain until Vercel generates it. You can deploy once with a placeholder, get the domain (e.g., `care-xyz.vercel.app`), update the env vars, and redeploy.

4.  **Deploy**:
    - Click **"Deploy"**.

## 4. Post-Deployment Configuration

### A. Update Authentication URLs (Google Cloud)

1.  Go to the [Google Cloud Console](https://console.cloud.google.com/apis/credentials).
2.  Edit your OAuth 2.0 Client credentials.
3.  Add your production URL to **Authorized JavaScript origins** (e.g., `https://care-xyz.vercel.app`).
4.  Add the callback path to **Authorized redirect URIs**:
    - `https://care-xyz.vercel.app/api/auth/callback/google`

### B. Configure Stripe Webhooks

1.  Go to [Stripe Dashboard > Developers > Webhooks](https://dashboard.stripe.com/webhooks).
2.  Click **"Add endpoint"**.
3.  **Endpoint URL**: `https://care-xyz.vercel.app/api/webhooks/stripe`
4.  **Events to send**: Select events your app listens to (e.g., `payment_intent.succeeded`, `checkout.session.completed`, etc.).
5.  **Get Helper Secret**: After creating the endpoint, reveal the **Signing Secret** (starts with `whsec_...`).
6.  Update the `STRIPE_WEBHOOK_SECRET` environment variable in Vercel with this value.
7.  Redeploy your application (Project > Deployments > Redeploy) for the new variable to take effect.

## Troubleshooting

- **Prisma Client Error**: If you see errors about "Prisma Client not initialized", ensure `npx prisma generate` is running during the build (usually happens automatically in `postinstall` or build).
- **500 Errors on Auth**: Check `NEXTAUTH_SECRET` and ensure the Google Client ID/Secret are correct and the redirect URIs in Google Cloud match your deployed URL exactly.
