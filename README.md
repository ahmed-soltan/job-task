# Course Learning Task

A responsive course-learning interface built with Next.js App Router, React Query, and Tailwind CSS.

The app simulates a real LMS flow using mock APIs:
- watch a lesson video
- browse course modules in an accordion
- open quiz and PDF lessons in modals
- submit comments
- view a course leaderboard

## Highlights

- Responsive course page with mobile-first behavior.
- Sticky video player on mobile while content sections scroll.
- Smooth anchor navigation to curriculum and comments sections.
- Curriculum rendered as expandable accordion modules.
- Quiz modal with:
	- countdown timer
	- persisted attempt state per lesson (Zustand)
	- answer submission and scoring
- PDF lesson modal support.
- Comment list with in-memory POST support.
- Leaderboard modal per course.

## Live Demo
[https://job-task-iota-plum.vercel.app/courses/seo-home-101]

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- React Query
- Zustand
- Base UI / shadcn UI primitives
- Vidstack player
- Lucide icons

## Routes

- Home: / 
	- Contains a button that navigates to the sample course.
- Course page: /courses/seo-home-101
	- Main learning experience.

## Mock API Endpoints

- GET /api/course
- GET /api/curriculum
- GET /api/comments
- POST /api/comments
- GET /api/course/[courseId]/leaderboard
- GET /api/lessons/[lessonId]/quiz
- POST /api/lessons/[lessonId]/quiz/submit

All endpoints currently return mock/in-memory data from the course feature constants.

## Project Structure

Main folders used in this task:

```text
app/
	api/
	courses/
features/
	courses/
		components/
		constants/
		hooks/
		models/
		services/
components/
	ui/
hooks/
```

## Getting Started

1. Install dependencies:

```bash
pnpm install
```

2. Start development server:

```bash
pnpm dev
```

3. Open in browser:

http://localhost:3000

## Available Scripts

```bash
pnpm dev
pnpm build
pnpm start
pnpm lint
```

## Notes

- Data is mocked for task/demo purposes.
- Comments are stored in server memory during runtime and reset when the server restarts.
- Quiz correct answers are hidden from the client quiz payload and checked server-side on submit.


## Performance 

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/a797f3fc-20de-4b1d-ae43-b3ca5d0d55e8" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/5fb302ae-50b5-4c8e-93c1-7d5a66d500b3" />

