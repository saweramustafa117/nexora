# Nexora

AI-powered talent intelligence and career navigation platform — a frontend-only mock dashboard prototype.

## Tech Stack

- React + Vite
- Tailwind CSS v4
- React Router
- Recharts
- lucide-react

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Features

### Landing Page
- Hero with Nexora branding and role selector (Candidate / Recruiter)

### Candidate Dashboard
- Summary metrics (Profile Strength, Skill Match, Applications, Career Growth)
- Career GPS roadmap widget
- Job match list with Gap Analysis modal (radar chart + learning resources)
- Opportunities feed (jobs, scholarships, fellowships, competitions, mentorship)
- Networking suggestions with connect actions

### Recruiter Dashboard
- Summary metrics (Applications, Matches, Time Saved, Active Postings)
- Smart Screening table with shortlist/reject actions
- Candidate detail drawer with AI summary, skills, proof of work
- Job posting management with match distribution charts
- Analytics (application quality pie chart, hiring funnel)

### Shared
- Dark sidebar + light content area
- Role switcher in top bar
- Fully mocked data — no backend required

## Project Structure

```
src/
├── components/     # Reusable UI components
├── context/        # Role context (candidate/recruiter)
├── data/           # Mock JSON data files
├── pages/          # Route pages
│   ├── candidate/
│   └── recruiter/
├── App.jsx
└── main.jsx
```
