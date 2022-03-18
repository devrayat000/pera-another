import apiInstance from '$lib/modules/axios'

export const enum ClassTestType {
  MCQ = 'mcq',
  WRITTEN = 'written',
}

export interface ClassTest extends ClassTestInput {
  id: number
  subject: string
  about: string
  type: ClassTestType
  occurring: string
  created_at: string
}

export async function getClassTests() {
  return apiInstance.get<ClassTest[]>('/class_test-list/').then(r => r.data)
}

export interface ClassTestInput {
  subject: string
  about: string
  type: ClassTestType
  occurring: string
}

export function createClassList(input: ClassTestInput) {
  return apiInstance
    .post<ClassTest>('/class_test-create/', input)
    .then(r => r.data)
}

export function updateClassTest(id: string, input: Partial<ClassTestInput>) {
  return apiInstance
    .post<ClassTest>(`class_test-update/${id}/`, input)
    .then(r => r.data)
}

export function deleteClasstest(id: string) {
  return apiInstance
    .delete<ClassTest>(`class_test-delete/${id}/`)
    .then(r => r.data)
}
