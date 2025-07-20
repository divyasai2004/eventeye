# SponsorSync – Smart Sponsorship & Brand Matchmaking Engine

## Overview
SponsorSync is a full-stack platform that connects student clubs with sponsors using smart matchmaking, detailed profiles, analytics, and messaging. Built for the EventEye hackathon.

## Features
- Student clubs create sponsor-ready event profiles
- Sponsors create brand profiles and filter opportunities
- Smart match scoring based on audience, theme, goals, and region
- Messaging system with file attachments
- Analytics dashboard for sponsors
- AI-powered proposal PDF generation for clubs
- Explore page for sponsors to browse all student club events

## Tech Stack
- **Frontend:** Next.js, React, Tailwind CSS
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **AI:** OpenAI API (for proposal generation)

## Setup Instructions
1. **Clone the repo:**
   ```bash
   git clone <your-repo-url>
   cd event1
```
2. **Backend:**
   ```bash
cd backend
npm install
node server.js
   # or npm start
```
3. **Frontend:**
   ```bash
cd frontend
   npm install
npm run dev
```
4. **Environment Variables:**
   - Backend: Create a `.env` file with `MONGO_URI` and `JWT_SECRET` (and `OPENAI_API_KEY` for AI proposals)
   - Frontend: Update API URLs if needed

## Demo Video
[Add your demo video link here]

## Screenshots
(Add screenshots of the main flows here)

## License
MIT
