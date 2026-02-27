# CareClarity

AI-assisted guidance for caregivers of children with ASD and neurodevelopmental conditions.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Auth & Database:** Firebase (Auth, Firestore)
- **AI:** Google Genkit (Gemini 2.5 Flash)

## Getting Started

### 1. Clone and install
```bash
git clone <your-repo-url>
cd CareClarity
npm install
```

### 2. Set up environment variables
```bash
cp .env.example .env.local
```

Fill in the values in `.env.local`:
- **GEMINI_API_KEY** — Get from [Google AI Studio](https://aistudio.google.com/apikey)
- **Firebase keys** — Get from [Firebase Console](https://console.firebase.google.com) → Project Settings → Web App

### 3. Run locally
```bash
npm run dev        # Start dev server at http://localhost:9002
npm run build      # Production build
npm start          # Serve production build
```

## Deploy to Vercel (Recommended)

The fastest way to deploy — takes about 2 minutes:

### Option A: One-click deploy
1. Push your code to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your GitHub repo
4. Add environment variables (same as `.env.local`)
5. Click **Deploy**

### Option B: CLI deploy
```bash
npm i -g vercel
vercel --prod
```
Set environment variables in the Vercel dashboard after first deploy.

### Environment Variables for Vercel
Add these in Vercel Dashboard → Settings → Environment Variables:
| Variable | Description |
|----------|-------------|
| `GEMINI_API_KEY` | Google Gemini API key |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase Web API key |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase auth domain |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase project ID |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase app ID |

## Project Structure

```
src/
├── ai/               # Genkit AI flows (explainable responses, safety validation, idea generation)
├── app/              # Next.js App Router pages
│   ├── dashboard/    # Protected dashboard pages (AI chat, Discover, Resources, etc.)
│   ├── login/        # Login page
│   ├── signup/       # Signup page
│   ├── forgot-password/  # Password reset
│   └── onboarding/   # New user onboarding flow
├── components/       # React components (UI, auth, dashboard)
├── firebase/         # Firebase configuration and React providers
├── hooks/            # Custom React hooks
└── lib/              # Utilities and data
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm start` | Serve production build |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript type checking |
| `npm run genkit:dev` | Start Genkit AI development server |

## License

Private — All rights reserved.
