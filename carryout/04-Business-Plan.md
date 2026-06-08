# Business Plan & Workflows

## 1. Core Value Proposition

**AMMY's Archives** is a custom-built learning management system designed specifically for Computer Engineering students. It serves as a **single point of truth** for all course materials across 6-7 academic modules.

### What It Solves
- Scattered lecture materials across different lecturers, formats (PDF, PPTX, handwritten notes), and platforms
- No centralized place to access study notes, summaries, and past materials
- Difficulty in self-paced study with no structured progression
- Need for AI-assisted understanding of complex technical topics

### Core Features
1. **Study Notes Library** — Structured, interactive lesson content organized by module and topic
2. **Study Summaries** — Condensed revision materials for quick review
3. **AI Tutor Assistant** — AI-powered explanations and Q&A for difficult concepts
4. **Material Archive** — Download original lecture materials (PDF, PPTX) from lecturers
5. **Interactive Quizzes** — Self-assessment blocks embedded within lessons
6. **Flashcards** — Spaced repetition study aids
7. **Progress Tracking** — Local progress persistence across sessions

### Current Scope (v1.0)
- File-based content delivery (no backend)
- Local state persistence (Zustand + localStorage)
- 6-7 modules with structured lesson content
- Landing page + student dashboard + lesson viewer

### Future Scope (Post-Polish)
- AI integration (OpenAI/Anthropic) for tutoring
- User authentication and personalized profiles
- Database-backed content management
- Real-time progress sync across devices
- PDF/PPTX download library
- Analytics and performance dashboards

## 2. Target Personas

### Persona A: The Student (Primary)
- **Role:** Computer Engineering student at the university
- **Goal:** Access all study materials for their modules in one place, study effectively, track progress
- **Behavior:** Checks the platform daily during semester, uses it for revision before exams
- **Needs:** Clean navigation, fast content loading, mobile-friendly (phone access between classes)
- **Pain Points:** Materials scattered across WhatsApp groups, email attachments, and lecturer portals

### Persona B: The Lecturer (Future)
- **Role:** Module lecturer (e.g., Mbaga A for CS 6307)
- **Goal:** Provide structured materials to students, track engagement
- **Needs:** Upload interface, content management, analytics

### Persona C: The Admin (AMMY — You)
- **Role:** Platform creator and maintainer
- **Goal:** Build and maintain the platform, add new modules and content
- **Needs:** Admin panel, design system gallery, content authoring tools

## 3. Critical User Journeys (CUJ)

### CUJ 1: First Visit → Module Discovery
```
Landing Page → Enter Name → Dashboard → View Module Grid → Select Module → View Lessons
```
**Success Criteria:** User can reach any lesson within 3 clicks from landing page.

### CUJ 2: Active Study Session
```
Module Page → Expand Lesson → Start Topic → Read Blocks → Take Quiz → Mark Complete
```
**Success Criteria:** User can consume a full lesson with embedded assessments.

### CUJ 3: Return Visit → Resume Progress
```
Landing Page → Enter Name → Dashboard → Resume Where Left Off → Continue Lesson
```
**Success Criteria:** Progress is preserved and user can pick up exactly where they stopped.

### CUJ 4: Mobile Study
```
Phone Browser → Landing Page → Navigate to Module → Read Content → Take Quiz
```
**Success Criteria:** Full functionality on mobile devices (sidebar collapses to hamburger).

### CUJ 5: Dark Mode Study (Night Session)
```
Any Page → Toggle Theme → Content Adapts → Study in Dark Mode
```
**Success Criteria:** Theme persists across sessions, all content readable in both modes.

## 4. Authorization Roles

### Current (v1.0 — No Auth)
- **Guest:** Full read access to all content (name-based identification only)
- No authentication required — enter name to personalize experience

### Future (Post-Auth Integration)
- **Student:** Read access to enrolled modules, write access to own progress
- **Lecturer:** Read/write access to assigned modules, upload materials
- **Admin:** Full access to all modules, user management, platform configuration

## 5. Module Registry (Current)

| Code | Module Name | Lecturer | Schedule |
|------|-------------|----------|----------|
| CS 6307 | Intro to Image, Video & Speech Proc. | Mbaga A | Mon 13:50-16:05; Tue 13:50-16:05, 19:15-21:30 |
| CS 6308 | Project II | — | — |
| CS 6309 | Digital Forensic | Alexnder R | Wed 09:55-12:10 |
| CS 6310 | Intro to Distributed Systems | Amani K | Tue 13:50-16:05; Fri 19:15-20:45 |
| CS 6311 | Innovation And Creativity | Malissa E | Tue 07:30-09:45 |
| ST 6323 | Probability And Statistics | Mwangalika D | Mon 13:50-16:05 |
| BM 6122 | Entrepreneurship | Mosha G | Thu 13:50-16:05 |

## 6. Success Metrics (Future)

- **Engagement:** % of students who return weekly
- **Completion:** % of lessons fully consumed per module
- **Performance:** Average quiz scores across modules
- **Adoption:** Number of active users per semester
- **Satisfaction:** Net Promoter Score from student surveys
