/**
 * LessonCard Component — Example Usage
 * 
 * This file demonstrates how to use the LessonCard component
 * with various statuses and configurations.
 */

import LessonCard, { type LessonCardProps } from './LessonCard'

// Example data - could come from your API or module data
const sampleLessons: LessonCardProps[] = [
  {
    id: '1',
    title: 'Introduction to Quantum Computing',
    description: 'Learn the fundamental concepts of quantum mechanics and how they apply to computing.',
    topicCount: 5,
    progress: 0,
    status: 'New',
    duration: '45 min',
    href: '/lms/modules/mock/lesson/1',
    order: 1
  },
  {
    id: '2',
    title: 'Qubits and Superposition',
    description: 'Dive deep into qubit architecture and understand superposition in quantum systems.',
    topicCount: 8,
    progress: 45,
    status: 'In Progress',
    duration: '1 hr 15 min',
    href: '/lms/modules/mock/lesson/2',
    order: 2
  },
  {
    id: '3',
    title: 'Quantum Gates and Circuits',
    description: 'Master the building blocks of quantum circuits with hands-on examples.',
    topicCount: 12,
    progress: 100,
    status: 'Completed',
    duration: '2 hr',
    href: '/lms/modules/mock/lesson/3',
    order: 3
  },
  {
    id: '4',
    title: 'Shor\'s Algorithm',
    description: 'Explore one of the most important quantum algorithms for integer factorization.',
    topicCount: 6,
    progress: 0,
    status: 'Locked',
    duration: '1 hr 30 min',
    href: '/lms/modules/mock/lesson/4',
    order: 4
  }
]

export function LessonCardShowcase() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {sampleLessons.map((lesson) => (
        <LessonCard key={lesson.id} {...lesson} />
      ))}
    </div>
  )
}

/**
 * Minimal usage example:
 * 
 * <LessonCard
 *   id="lesson-1"
 *   title="Lesson Title"
 *   description="Optional description"
 *   topicCount={5}
 *   progress={30}
 *   status="In Progress"
 *   duration="45 min"
 *   href="/lms/modules/code/lesson-1"
 *   order={1}
 * />
 */
