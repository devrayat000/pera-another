import apiInstance from '$lib/modules/axios'

export const enum ClassTestType {
  MCQ = 'mcq',
  WRITTEN = 'written',
}

export interface ClassTest {
  id: number
  subject: string
  about: string
  type: ClassTestType
  occurring: string
  created_at: string
}

export function getClassTests() {
  return apiInstance.get<ClassTest[]>('/class_test-list').then(r => r.data)
}
