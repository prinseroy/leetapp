# DevTrack AI - Coding Efficiency Analyzer

DevTrack AI is a complete SaaS-style developer productivity platform that tracks and analyzes a developer’s coding activity across platforms like LeetCode, Codeforces, HackerRank, and GitHub, providing gamification and AI-powered insights.

## Folder Structure

```
DevTrackAI/
├── backend/                  # Node.js + Express Backend
│   ├── index.ts              # Entry point
│   ├── models/               # Auto-designed Mongoose Models
│   │   ├── User.ts           # Developer core info
│   │   ├── CodingProfile.ts  # Integrated platforms info
│   │   ├── DailyStat.ts      # Today's submission and problems
│   │   ├── ProblemHistory.ts # History of problems solved
│   │   ├── ActivityTimeline.ts# Timeline events
│   │   ├── CodingStreak.ts   # Streak counter
│   │   ├── ProductivityAnalytics.ts # AI analytics and insights
│   │   ├── Achievement.ts    # Gamification badges
│   │   ├── Goal.ts           # Goal tracking
│   │   └── FocusTracking.ts  # Focus vs distraction stats
│   ├── routes/               # API Endpoints
│   │   ├── user.ts           # Auth routes
│   │   ├── sync.ts           # Platform data sync
│   │   └── dashboard.ts      # Dashboard stats & AI insights
│   ├── middleware/           # Express middlewares (JWT auth)
│   ├── services/             # Background services and AI logic
│   ├── tsconfig.json         # TS Config
│   └── package.json          # Backend dependencies
├── frontend/                 # Next.js 14 Frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx      # Landing Page
│   │   │   ├── layout.tsx    # Root layout with Dark Mode
│   │   │   └── dashboard/    # Analytics Dashboard
│   │   │       └── page.tsx
│   │   └── components/       # Reusable React Components
│   │       ├── Sidebar.tsx
│   │       ├── StatCard.tsx
│   │       └── Charts.tsx    # Recharts configurations
│   ├── tailwind.config.ts    # Tailwind styles
│   ├── tsconfig.json         # TS Config
│   └── package.json          # Frontend dependencies
└── README.md
```

## Features Implemented
1. **Developer Profile System:** Architecture supports merging multi-platform statistics (LeetCode, Codeforces, GitHub, etc).
2. **Automatic Database Architecture:** Fully fleshed-out MongoDB schema utilizing 10 custom Mongoose models linked via ObjectIds.
3. **Coding Analytics Dashboard:** Next.js UI using `Recharts` for Activity Timelines and Difficulty Distribution.
4. **AI Productivity Insights:** Automated algorithm generating custom insights like optimal problem-solving windows.
5. **Gamification:** Badges, XP tracking, and Streaks integrated into the UI.

## Tech Stack
- **Frontend:** Next.js (React), Tailwind CSS, Recharts, Lucide Icons
- **Backend:** Node.js, Express.js, TypeScript
- **Database:** MongoDB (Mongoose)
- **Auth:** JSON Web Tokens (JWT), bcrypt

## Instructions to Run Locally

### Prerequisites
- Node.js (v18+)
- MongoDB running locally on port 27017

### 1. Setup Backend
```bash
cd backend
npm install
# Ensure MongoDB is running locally
npm run dev
```
The backend will run on `http://localhost:5000`.

### 2. Setup Frontend
```bash
cd frontend
npm install
npm run dev
```
The frontend will run on `http://localhost:3000`.

## Instructions to Run with Docker

### Prerequisites
- Docker and Docker Compose installed on your machine.

### 1. Build and Run the Entire Stack
```bash
# From the root directory
docker-compose up --build
```

This will automatically:
1.  Spin up a **MongoDB** container.
2.  Build and run the **Backend** service (on `http://localhost:5000`).
3.  Build and run the **Frontend** service (on `http://localhost:3000`).

### 2. Stop the Services
```bash
docker-compose down
```

## Instructions to Deploy

### Backend Deployment (Render / Heroku)
1. Push the repository to GitHub.
2. Link the repository to Render or Heroku as a Node.js Web Service.
3. Set Environment Variables (`MONGO_URI` using MongoDB Atlas, `JWT_SECRET`, `PORT`).
4. Set build command to `npm run build` and start command to `npm start`.

### Frontend Deployment (Vercel)
1. Import the repository into Vercel.
2. Ensure the Root Directory is set to `frontend`.
3. Vercel will automatically detect Next.js and apply the correct build settings.
4. Set `NEXT_PUBLIC_API_URL` to your deployed backend URL.

## Analytics Algorithms (Example)
The AI productivity algorithm evaluates submission times (identifying the heaviest activity window, e.g., 8PM-11PM) and contrasts it with focus tracking statistics to generate dynamic textual insights. Difficulties are weighted to output an overarching `productivityScore`.
