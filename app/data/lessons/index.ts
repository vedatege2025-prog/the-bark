import type { LessonContent } from '@/types/lesson'
import a1g1 from './a1-g1'

const allLessons: LessonContent[] = [...a1g1]

export function getLessonContent(unitId: string, lessonIndex: number): LessonContent | null {
  return allLessons.find((l) => l.unitId === unitId && l.lessonIndex === lessonIndex) ?? null
}

export function getUnitLessons(unitId: string): LessonContent[] {
  return allLessons.filter((l) => l.unitId === unitId).sort((a, b) => a.lessonIndex - b.lessonIndex)
}
