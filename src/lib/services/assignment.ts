import apiInstance from '$lib/modules/axios'

export interface Assignment extends AssignmentInput {
  id: number
  subject: string
  title: string
  due: string
  created_at: string
}

export function getAssignment() {
  return apiInstance.get<Assignment[]>('/assignment-list').then(r => r.data)
}

export interface AssignmentInput {
  subject: string
  title: string
  due: string
}

export function createAssignment(input: AssignmentInput) {
  return apiInstance
    .post<Assignment>('/assignment-create/', input)
    .then(r => r.data)
}

export function updateAssignment(id: string, input: Partial<AssignmentInput>) {
  return apiInstance
    .post<Assignment>(`assignment-update/${id}/`, input)
    .then(r => r.data)
}

export function deleteAssignment(id: string) {
  return apiInstance
    .delete<Assignment>(`assignment-delete/${id}/`)
    .then(r => r.data)
}
