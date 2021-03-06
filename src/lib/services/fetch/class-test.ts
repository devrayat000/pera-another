import apiInstance from '$lib/modules/axios'

export const enum ClassTestType {
  MCQ = 'mcq',
  WRITTEN = 'written',
  VIVA = 'viva',
}

export interface ClassTest {
  id: number
  subject: string
  about: string
  teacher: string
  type: ClassTestType
  occurring: string
  time: string
  sec: string
  created_at: string
}

export async function getClassTests() {
  return apiInstance.get<ClassTest[]>('/class_test-list/').then(r => r.data)
}
